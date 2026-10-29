import type { Meal } from "../types/mealbridge";

export function localWeekStart(now = new Date()): string {
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, "0")}-${String(monday.getDate()).padStart(2, "0")}`;
}

export function cycleExpired(
  start: string,
  weeks: number,
  today = localWeekStart(),
): boolean {
  const [year, month, day] = start.split("-").map(Number);
  const end = new Date(year, month - 1, day + weeks * 7);
  return today >= localWeekStart(end);
}

export function mergeGeneratedPlan(
  current: Meal[],
  generated: Meal[],
  fresh: boolean,
): Meal[] {
  return generated.map((meal, i) =>
    !fresh && current[i]?.approved
      ? current[i]
      : { ...meal, approved: false, completed: false },
  );
}

// Full snapshots retain AI/custom recipes when their week leaves the planner.
export function collectFavourites(
  names: string[],
  snapshots: Meal[],
  custom: Meal[],
  plan: Meal[],
  library: Meal[],
): Meal[] {
  return names.flatMap((name) => {
    const meal = [...snapshots, ...custom, ...plan, ...library].find(
      (item) => item.name === name,
    );
    return meal
      ? [
          {
            ...meal,
            ingredients: [...meal.ingredients],
            instructions: meal.instructions
              ? [...meal.instructions]
              : undefined,
          },
        ]
      : [];
  });
}
