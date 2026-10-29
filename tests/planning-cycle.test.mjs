import test from 'node:test';
import assert from 'node:assert/strict';
import { localWeekStart, cycleExpired, mergeGeneratedPlan, collectFavourites } from '../src/domain/planningCycle.ts';
import { parseRecipeSubmission } from '../backend/communityRecipeContract.ts';
const meal = {name:'Old meal', ingredients:['rice','beans'], instructions:['Boil rice','Add beans'], approved:true, completed:true, leftovers:false};
test('Monday boundaries, Sunday, year transition and multiweek expiration use local dates', () => {
  assert.equal(localWeekStart(new Date(2026,9,25)), '2026-10-19');
  assert.equal(localWeekStart(new Date(2026,9,26)), '2026-10-26');
  assert.equal(localWeekStart(new Date(2027,0,1)), '2026-12-28');
  assert.equal(cycleExpired('2026-10-19', 1, '2026-10-26'), true);
  assert.equal(cycleExpired('2026-10-19', 2, '2026-10-26'), false);
  assert.equal(cycleExpired('2026-10-19', 2, '2026-11-02'), true);
});
test('fresh plans replace every approved/completed slot; current-cycle regeneration preserves approvals', () => {
  const next={...meal,name:'New meal'};
  assert.deepEqual(mergeGeneratedPlan([meal],[next],false),[meal]);
  assert.deepEqual(mergeGeneratedPlan([meal],[next],true),[{...next,approved:false,completed:false}]);
});
test('full favourite snapshot survives plan rollover and name-only records migrate without invention', () => {
  const snapshots=collectFavourites([meal.name],[],[],[meal],[]);
  assert.equal(collectFavourites([meal.name],snapshots,[],[],[])[0].instructions[1],'Add beans');
  assert.deepEqual(collectFavourites(['Missing recipe'],[],[],[],[]),[]);
  assert.equal(collectFavourites([meal.name],[],[meal],[],[])[0].name,meal.name);
});
test('community submissions require affirmative consent and whitelist recipe data', () => {
  const recipe={name:'My stew',ingredients:['1 cup rice','2 tins beans'],instructions:['Boil rice','Heat beans'],prepTime:5,cookTime:20,servings:4,nutrition:'Not calculated',household:['private']};
  const input={requestId:'a'.repeat(64),consent:true,consentVersion:'recipe-sharing-v1',recipe,pantry:'private'};
  assert.equal(parseRecipeSubmission({...input,consent:false}),null);
  assert.equal(parseRecipeSubmission({...input,recipe:{...recipe,cookTime:Infinity}}),null);
  assert.equal(parseRecipeSubmission({...input,recipe:{...recipe,instructions:['Only one']}}),null);
  const parsed=parseRecipeSubmission(input);
  assert.ok(parsed);
  assert.equal('pantry' in parsed,false);
  assert.equal('household' in parsed.recipe,false);
});
