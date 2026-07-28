export const APP_STORAGE_KEYS = {
  people: 'mb-people',
  customRecipes: 'mb-custom-recipes',
  favouriteRecipes: 'mb-favourite-recipes',
  plan: 'mb-plan',
  planWeeks: 'mb-plan-weeks',
  budget: 'mb-budget',
  pantry: 'mb-pantry',
  shoppingChecked: 'mb-shopping-checked',
  calm: 'mb-calm',
  weeklyAiInstruction: 'mb-weekly-ai-instruction',
} as const

export const loadAppStorage = <T>(
  key: string,
  fallback: T,
): T => {
  try {
    const stored = localStorage.getItem(key)

    if (stored === null) {
      return fallback
    }

    return JSON.parse(stored) as T
  } catch {
    return fallback
  }
}

export const saveAppStorage = (
  key: string,
  value: unknown,
): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage failure must never prevent MealBridge from running.
  }
}
