export type CommunityRecipe = {
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  nutrition: string;
};
export type RecipeSubmission = {
  requestId: string;
  consent: true;
  consentVersion: "recipe-sharing-v1";
  recipe: CommunityRecipe;
};

export function parseRecipeSubmission(body: unknown): RecipeSubmission | null {
  if (!body || typeof body !== "object") return null;
  const value = body as Record<string, unknown>;
  if (
    value.consent !== true ||
    value.consentVersion !== "recipe-sharing-v1" ||
    typeof value.requestId !== "string" ||
    !/^[a-f0-9]{64}$/.test(value.requestId) ||
    !value.recipe ||
    typeof value.recipe !== "object"
  )
    return null;
  const recipe = value.recipe as Record<string, unknown>;
  const text = (input: unknown, max: number): input is string =>
    typeof input === "string" && input.trim().length > 0 && input.length <= max;
  const list = (input: unknown): input is string[] =>
    Array.isArray(input) &&
    input.length >= 2 &&
    input.length <= 100 &&
    input.every((item) => text(item, 2000));
  const positive = (input: unknown): input is number =>
    typeof input === "number" &&
    Number.isFinite(input) &&
    input > 0 &&
    input <= 10000;
  if (
    !text(recipe.name, 200) ||
    !list(recipe.ingredients) ||
    !list(recipe.instructions) ||
    !positive(recipe.prepTime) ||
    !positive(recipe.cookTime) ||
    !positive(recipe.servings) ||
    typeof recipe.nutrition !== "string" ||
    recipe.nutrition.length > 2000
  )
    return null;
  // Allowlist recipe fields. Never copy household data or extra client fields.
  const clean: CommunityRecipe = {
    name: recipe.name,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    servings: recipe.servings,
    nutrition: recipe.nutrition,
  };
  if (new TextEncoder().encode(JSON.stringify(clean)).byteLength > 48000)
    return null;
  return {
    requestId: value.requestId,
    consent: true,
    consentVersion: "recipe-sharing-v1",
    recipe: clean,
  };
}
