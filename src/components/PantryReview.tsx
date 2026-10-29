import { useState } from "react";

type Props = {
  pantry: string;
  reviewed: string;
  week: string;
  onSave: (items: string) => void;
};

export function PantryReview({ pantry, reviewed, week, onSave }: Props) {
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <section
      className="mb-5 rounded-3xl border border-teal-200 bg-white p-5 shadow-sm"
      aria-label="Weekly pantry review"
    >
      <h3 className="text-lg font-bold">Weekly pantry update</h3>
      <p className="my-2 text-sm text-slate-600">
        {reviewed === week
          ? "Pantry reviewed this week. You can update it anytime."
          : "Review what is still at home before planning or shopping this week."}{" "}
        Remove used-up items and add anything you have restocked.
      </p>
      {draft === null ? (
        <button
          className="rounded-xl bg-[#0062A8] px-4 py-3 font-semibold text-white"
          onClick={() => setDraft(pantry)}
        >
          Update pantry
        </button>
      ) : (
        <>
          <label className="block text-sm font-semibold">
            Items at home (separate with commas)
            <textarea
              className="mt-2 w-full rounded-xl border p-3"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
          </label>
          <div className="mt-3 flex gap-3">
            <button
              className="rounded-xl bg-[#0062A8] px-4 py-3 font-semibold text-white"
              onClick={() => {
                onSave(draft.trim());
                setDraft(null);
              }}
            >
              Save pantry for this week
            </button>
            <button onClick={() => setDraft(null)}>Cancel</button>
          </div>
        </>
      )}
    </section>
  );
}
