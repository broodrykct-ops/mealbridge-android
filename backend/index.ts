import { submitCommunityRecipe } from './communityRecipes';
import { ai, error, json, router } from '@appdeploy/sdk';
import {
    buildMealAlternativePrompt,
    isMealAlternativeInput,
    mealAlternativeSchema,
    type MealAlternativeInput,
} from './mealAlternativeContract';
import { buildMealPlanPrompt, isMealPlanInput, mealPlanSchema, type MealPlanInput } from './mealPlanContract';

export const handler = router({
    'POST /api/community-recipes': [submitCommunityRecipe],
    'GET /api/_healthcheck': [async () => json({ message: 'Success' })],
    'POST /api/meal-plan': [async ({ body }) => { const data=(body||{}) as MealPlanInput; if(!isMealPlanInput(data)) return error('people, preferences and weeks (1-4) are required',400); try{const result=await ai.extract({prompt:buildMealPlanPrompt(data),schema:mealPlanSchema,maxRetries:2,maxTokens:8192,temperature:0.25,thinkingMode:'FAST'});const output=result.data as {meals?:unknown[]};const expected=Number(data.weeks)*7;if(!Array.isArray(output?.meals)||output.meals.length!==expected){console.warn('Meal plan AI returned unexpected meal count',{expected,actual:Array.isArray(output?.meals)?output.meals.length:null});return error('MealBridge AI returned an incomplete meal plan',502)}return json(result.data)}catch(err){const rpcError=typeof err==='object'&&err!==null?err as {statusCode?:number;responseText?:string}:{};console.warn('Meal plan AI failed',{statusCode:rpcError.statusCode,responseText:rpcError.responseText});return error('MealBridge AI is temporarily unavailable',502)}}],
    'POST /api/meal-alternative': [
        async ({ body }) => {
            const data = (body || {}) as MealAlternativeInput;
            if (!isMealAlternativeInput(data)) {
                return error('currentMeal and people are required', 400);
            }
            try {
                const result = await ai.extract({
                    prompt: buildMealAlternativePrompt(data),
                    schema: mealAlternativeSchema,
                    maxRetries: 2,
                    maxTokens: 1800,
                    temperature: 0.55,
                    thinkingMode: 'FAST',
                });
                return json(result.data);
            } catch (err) {
                const rpcError = typeof err === 'object' && err !== null ? err as { statusCode?: number; responseText?: string } : {};
                console.warn('Meal alternative AI failed', { statusCode: rpcError.statusCode, responseText: rpcError.responseText });
                return error('MealBridge AI is temporarily unavailable', 502);
            }
        },
    ],
});

