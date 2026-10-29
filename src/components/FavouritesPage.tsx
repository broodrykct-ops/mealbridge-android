import { useState } from "react";
import type { Meal } from "../types/mealbridge";

type Props = {
  meals: Meal[];
  missing: string[];
  onOpen: (meal: Meal) => void;
  onRemove: (name: string) => void;
  onAdd: () => void;
  onShare: (meal: Meal) => void;
  notice: string;
  sharing: boolean;
};

export function FavouritesPage({
  meals,
  missing,
  onOpen,
  onRemove,
  onAdd,
  onShare,
  notice,
  sharing,
}: Props) {
  const [search, setSearch] = useState("");
  return (
    <section>
      <h2 className="text-2xl font-bold">Favourites</h2>
      <p className="mt-1 text-sm text-slate-600">
        Keep recipes you love and choose them for any day in your planner.
      </p>
      <button
        className="my-4 rounded-xl bg-[#0062A8] px-4 py-3 font-semibold text-white"
        onClick={onAdd}
      >
        Add your own recipe
      </button>
      <label className="mb-4 block text-sm font-semibold">
        Search favourites
        <input
          className="mt-2 w-full rounded-xl border p-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      {notice && (
        <p role="status" className="mb-4 rounded-xl bg-teal-50 p-4">
          {notice}
        </p>
      )}
      {!meals.length && (
        <p className="rounded-2xl bg-white p-5">
          Save a recipe using its heart button, or add your own recipe.
        </p>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        {meals
          .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
          .map((meal) => (
            <article
              key={meal.name}
              className="rounded-3xl bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-bold">{meal.name}</h3>
              <p className="my-2 text-sm text-slate-600">
                {meal.custom
                  ? "Your personal recipe · private on this device"
                  : "Saved recipe"}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  className="rounded-xl bg-[#0B1D36] px-4 py-2 text-white"
                  onClick={() => onOpen(meal)}
                >
                  View recipe
                </button>
                <button onClick={() => onRemove(meal.name)}>
                  Remove favourite
                </button>
              </div>
              {meal.custom && (
                <details className="mt-4 text-sm">
                  <summary>Share with the MealBridge community</summary>
                  <p className="my-2">
                    Optional: selecting the button below gives MealBridge
                    permission to store this recipe in the global recipe
                    database. Only recipe details are sent, without your
                    household or pantry information.
                  </p>
                  <button
                    disabled={sharing}
                    className="rounded-xl border p-3 disabled:opacity-50"
                    onClick={() => onShare(meal)}
                  >
                    {sharing
                      ? "Submitting…"
                      : "I give permission — submit this recipe"}
                  </button>
                </details>
              )}
            </article>
          ))}
      </div>
      {missing.map((name) => (
        <p key={name} className="mt-3 rounded-xl bg-amber-50 p-3">
          {name}: this older favourite saved only its name. Save it again from
          its recipe to restore the details.{" "}
          <button className="underline" onClick={() => onRemove(name)}>
            Remove
          </button>
        </p>
      ))}
    </section>
  );
}
