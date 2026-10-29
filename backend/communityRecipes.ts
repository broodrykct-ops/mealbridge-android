import { db, error, json, type RouterMiddleware } from "@appdeploy/sdk";
import { createHash } from "node:crypto";
import { parseRecipeSubmission } from "./communityRecipeContract";

export const submitCommunityRecipe: RouterMiddleware = async ({ body }) => {
  const input = parseRecipeSubmission(body);
  if (!input)
    return error(
      "A complete recipe and explicit sharing consent are required",
      400,
    );
  const payload = JSON.stringify(input.recipe);
  const hash = createHash("sha256").update(payload).digest("hex");
  if (hash !== input.requestId)
    return error("Recipe receipt does not match content", 400);
  try {
    // Chosen ID creates a single durable receipt, including on a replay after
    // a lost response. A duplicate never overwrites the original consent.
    await db.tx.add("community_recipe_submissions", [
      {
        id: hash,
        recipe: input.recipe,
        consent: true,
        consentVersion: input.consentVersion,
        consentedAt: new Date().toISOString(),
        status: "pending-review",
      },
    ]);
    return json({ requestId: hash, status: "pending-review" });
  } catch {
    return error(
      "Community submission could not be confirmed. Retry the same recipe later.",
      503,
    );
  }
};
