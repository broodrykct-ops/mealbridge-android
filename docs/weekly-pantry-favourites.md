# Weekly pantry, planner cycles and favourites

This change targets the released Android entry point (`src/main.tsx` →
`MealBridgeBootstrap.tsx` → `src/App.tsx`). The separate routed app scaffold is
not the production entry point.

## User behaviour

- A weekly in-app pantry review keeps existing items until the user saves an
  update. Users can edit it any time. Saving updates planning/shopping inputs.
- Approving a recipe and cooking it are separate actions. Cooking Mode's finish
  action marks a planned meal cooked; the planner also offers a reversible
  “Mark cooked” button.
- “Start next plan” replaces the previous cycle, including approved meals, and
  clears cooking completion and shopping ticks. Generating from Household also
  starts fresh when the stored cycle has expired or every meal is cooked.
  Within an active cycle, ordinary regeneration still preserves approved meals.
- Favourites retain complete recipe snapshots across plan replacement and
  restart. Existing name-only favourites are recovered from the current plan,
  personal recipes or built-in library. A name with no recoverable recipe is
  shown as unavailable instead of inventing its ingredients or method.
- Every planner day can be replaced from favourites, including later weeks.
  The replacement resets approval/completion and updates the shopping list.
- Saving a personal recipe adds it to favourites, with optional assignment to
  a planner day. It stays on the device until the user explicitly submits it.

## Community submission backend

`backend/index.ts`, `mealPlanContract.ts` and `mealAlternativeContract.ts` were
captured from AppDeploy app `faf6c5ba337b10734f`, source version
`1787129841966`. The new route and community modules are prepared source;
they have **not** been deployed to the running backend.

Before release, apply the new route and modules to the latest backend source
using a generated SDK with `db.tx.add` support, preserving the existing web
frontend and AI endpoints. Do not replace that app with this Android frontend.
Confirm a real submission writes one record to
`community_recipe_submissions`, and that replaying the same request does not
create another. This integration requires the deployed AppDeploy SDK/database;
the frontend build does not typecheck or execute that SDK.

The server validates explicit consent and an allowlist of recipe fields,
validates content/receipt hashes, limits payload size, and stores the recipe
with a consent timestamp and `pending-review` status. It does not publish
submissions directly or expose them through a public listing endpoint. Review
and promotion into the shared recipe catalogue remain an administrative step.
An unconfirmed request is shown honestly and leaves the private copy intact.

New storage keys: `mb-favourite-snapshots-v1`, `mb-pantry-reviewed-week`, and
`mb-plan-started-week`. Existing storage keys are retained. Old plans have no
historical start date, so first upgrade anchors their cycle to the current
local week; “Start next plan” remains available immediately. Personal recipes
and favourites remain device-local, matching existing app storage behaviour.

## Verification

Use Node 22.18+ (tested with Node 24):

```sh
npm ci
npm test
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
npx cap sync android
```

The browser test serves the built app itself and mocks remote responses. It
covers pantry persistence, old favourite migration, personal recipe saving,
restart, favourite assignment in weeks one and two, cooking completion,
fresh-plan fallback, favourite retention, explicit consent, recipe-only
submission, retry receipts and failed submissions. It checks a 412px viewport
for horizontal overflow and runtime errors. A browser binary override can be
provided with `CHROMIUM_EXECUTABLE_PATH` in constrained environments.

Physical Android testing and a signed APK/AAB build have not been performed
here. Before distribution, verify pause/resume across a week boundary,
upgrade from the installed version, and the real community backend. Increment
Android versionCode/versionName when preparing the release.

## In-app tutorials

Help in the header opens a dedicated tutorial page from every main screen.
Home also offers Show me the basics; Settings links to the tutorial index.
Twelve topics cover first use, navigation, household setup, pantry review,
planner controls, fresh plans, favourites, personal recipes, cooking, shopping,
accessibility and optional community sharing. Each topic shows one step at a
time and expandable button explanations. Reading help does not mutate app
records; Back to app restores the originating screen. The content is bundled
with the app and does not require a tutorial service or video downloads.

Mobile browser verification includes the help entry points, step navigation,
button explanation controls, returning to the originating page, unchanged
planner data while reading tutorials, and a 320px layout check.
