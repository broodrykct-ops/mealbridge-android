import type { Meal } from "../types/mealbridge";
import { mealAiApi } from "./mealAi";

// The request contains recipe fields only. A deterministic receipt prevents
// duplicate submissions if the server saves a recipe but its response is lost.
export async function submitCommunityRecipe(meal: Meal): Promise<void> {
  if (!meal.custom) throw new Error("Only personal recipes may be submitted");
  const recipe = {
    name: meal.name,
    ingredients: meal.ingredients,
    instructions: meal.instructions,
    prepTime: meal.prepTime,
    cookTime: meal.cookTime,
    servings: meal.servings,
    nutrition: meal.nutrition,
  };
  const bytes = new TextEncoder().encode(JSON.stringify(recipe));
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  const requestId = Array.from(new Uint8Array(hash), (value) =>
    value.toString(16).padStart(2, "0"),
  ).join("");
  const { data } = await mealAiApi.post("/api/community-recipes", {
    requestId,
    consent: true,
    consentVersion: "recipe-sharing-v1",
    recipe,
  });
  if (data?.requestId !== requestId || data?.status !== "pending-review") {
    throw new Error("Submission was not acknowledged");
  }
}
