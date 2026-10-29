import type { Tab } from '../../types/mealbridge';

export type Tutorial = {
  id: string; title: string; summary: string; screen: Tab; screenLabel: string;
  steps: string[]; buttons: [string, string][]; note?: string;
};

export const tutorials: Tutorial[] = [
  {
    id: 'start', title: 'Start here', summary: 'Your first meal plan, in three small steps.', screen: 'family', screenLabel: 'Open Family',
    steps: [
      'Open Family. Tap Add person and enter one household member. Add any food allergies or foods they cannot eat.',
      'Choose 1 week to begin. You can update your budget and pantry if you want to. Tap Generate my 1-week plan.',
      'Open Meals. Pick one meal to look at and tap View recipe. You can leave the other meals for later.',
    ],
    buttons: [['Set up your household', 'Opens Family so you can add the people you cook for.'], ['Generate my plan', 'Asks MealBridge to suggest dinners using your household details. This needs an internet connection.'], ['View recipe', 'Shows the ingredients and cooking instructions.'], ['Help', 'Brings you back to these tutorials whenever you need them.']],
    note: 'One step is enough for now. You can come back to the rest at any time.',
  },
  {
    id: 'navigate', title: 'Find your way around', summary: 'Know where to go and how to get back.', screen: 'home', screenLabel: 'Open Home',
    steps: ['Use the buttons at the bottom of the screen to move between Home, Family, Meals, Shopping, Favourites and Settings.', 'Tap Help at the top whenever you are unsure. Choose just the topic you need.', 'To leave a recipe or a form, tap its X button. In a tutorial, use All tutorials or Back to app.'],
    buttons: [['Home / MealBridge logo', 'Returns to your home screen and overview.'], ['Family', 'Household members, food needs, budget and plan generation.'], ['Meals', 'Your planner and recipes for each day.'], ['Shopping', 'The shopping list made from your current plan.'], ['Favourites', 'Your saved recipes and your own recipes.'], ['Settings', 'Calm mode, text size and contrast.'], ['X / Cancel', 'Closes the current window. Cancel leaves an unsaved pantry edit unchanged.'], ['Install MealBridge', 'If shown in your browser, adds the app to the device. The X dismisses this prompt.']],
  },
  {
    id: 'family', title: 'Set up your household', summary: 'Tell MealBridge what works for your home.', screen: 'family', screenLabel: 'Open Family',
    steps: ['Tap Add person. Enter their name, role and age, then any food needs, exclusions or texture preferences you want the planner to consider.', 'Add other household members when you are ready. Enter a weekly grocery budget and any planning instructions, such as quick meals on busy evenings.', 'Choose 1, 2, 3 or 4 weeks, then tap Generate my plan. Start with 1 week if that feels easier.'],
    buttons: [['Add person', 'Adds a household member form.'], ['Bin beside a person', 'Removes that person from your saved household.'], ['1 / 2 / 3 / 4 weeks', 'Sets how many weeks to request when generating a plan.'], ['Generate my plan', 'Creates dinner suggestions. In the current planning period, approved meals are kept. After the period ends or all meals are cooked, it starts a fresh plan.']],
    note: 'Details save on this device as you enter them. Household details are sent to the planning service when you request suggestions. Check suggested ingredients against any allergies.',
  },
  {
    id: 'pantry', title: 'Update your pantry', summary: 'Tell the app what you already have.', screen: 'family', screenLabel: 'Open pantry update',
    steps: ['Find Weekly pantry update on Home, Family, Meals or Shopping. Tap Update pantry.', 'Keep the items you still have. Remove used-up items and add anything you have restocked. Separate items with commas, for example: salt, rice, cooking oil.', 'Tap Save pantry for this week. Your shopping list updates, and the planner uses this pantry list the next time you request suggestions.'],
    buttons: [['Update pantry', 'Opens your existing list for editing.'], ['Save pantry for this week', 'Saves your changes and records that you reviewed the pantry this week. It also clears shopping ticks so you can check the updated list.'], ['Cancel', 'Closes the edit without saving its changes.']],
    note: 'Cooking a meal does not deduct pantry ingredients. Review what is left each week; you can update it anytime. This is an in-app prompt, not a phone notification.',
  },
  {
    id: 'planner', title: 'Use your weekly planner', summary: 'Choose meals and understand each meal button.', screen: 'plan', screenLabel: 'Open Meals',
    steps: ['Look at one day at a time. Tap View recipe to see that meal. Use the week arrows for a longer plan.', 'If the meal works for you, tap Approve. If you want a different idea, tap Suggest another. You can enter an instruction above the meals before asking.', 'Use Save as favourite for a recipe you want to keep. Choose favourite puts one of your saved recipes into that day instead.'],
    buttons: [['View recipe', 'Opens the ingredients and method.'], ['Approve / Approved', 'Marks a meal as a choice you want to keep during ordinary regeneration. Tap again to undo approval. It does not mean you cooked it.'], ['Suggest another', 'Requests a different recipe for that day. Optional instructions above the meals apply to this request. It needs the internet; a library alternative may be offered if the service is unavailable.'], ['Save as favourite / Saved favourite', 'Keeps the full recipe in Favourites. Tap Saved favourite again to remove it from Favourites. The planned meal stays in place.'], ['Choose favourite', 'Lets you select a saved recipe for this day. It replaces that day’s meal and clears its approval and cooked status.'], ['Mark cooked / Cooked · undo', 'Records that you made this meal. Tap again to undo. It does not change your pantry.'], ['Lunch leftovers', 'Toggles extra portions for lunch. When on, the shopping list doubles this meal’s ingredient amounts.'], ['Previous week / Next week arrows', 'Moves between weeks inside your current plan. An unavailable arrow means there is no week in that direction.'], ['Build shopping list', 'Opens Shopping for all meals currently in your plan, including meals you have not approved yet.'], ['Add your own recipe', 'Opens a form to save a personal recipe to Favourites, with an optional day assignment.']],
  },
  {
    id: 'next-plan', title: 'Finish a week and start again', summary: 'Get a fresh plan when you are ready.', screen: 'plan', screenLabel: 'Open Meals',
    steps: ['After making a meal, tap Mark cooked on its planner card, or Finish cooking in Cooking Mode.', 'When all planned meals are cooked, you will see a prompt for the next plan. You can also start a new plan after a week ends.', 'Tap Start next plan when you are ready to replace the current plan. Your saved favourites and personal recipes stay available.'],
    buttons: [['Mark cooked', 'Records that a planned meal has been made. Approval and cooking completion are separate.'], ['Start next plan', 'Replaces the current plan with fresh suggestions and clears the previous approvals, cooked marks and shopping ticks. It needs the internet for AI suggestions.'], ['Generate my plan in Family', 'Within an active planning period it keeps approved meals. When the period has expired or all meals are cooked, it generates a fresh plan.']],
    note: 'Finishing a week does not replace your meals automatically. For a plan of several weeks, the fresh-plan action replaces the whole plan, not just the visible week. If AI is unavailable, a library plan is offered for you to check.',
  },
  {
    id: 'favourites', title: 'Save and use favourites', summary: 'Keep meals you like and use them again.', screen: 'favourites', screenLabel: 'Open Favourites',
    steps: ['On a meal in Meals, tap Save as favourite. You can also save from inside View recipe.', 'Open Favourites to find it again. Use Search favourites if your list is long.', 'To use a saved recipe on a particular day, open Meals, find that day and tap Choose favourite. Tap the recipe you want.'],
    buttons: [['Save as favourite', 'Saves the full recipe, so it stays available when your planner changes.'], ['Saved favourite / Remove favourite', 'Removes the recipe from your favourites list. It does not remove a planned meal or delete your own saved recipe.'], ['View recipe', 'Opens a saved recipe without changing your planner.'], ['Search favourites', 'Filters saved recipes by name. Clear the search box to see them all.'], ['Choose favourite', 'Replaces the chosen planner day with the saved recipe. Use the correct week first if your plan is longer than one week.'], ['Cancel in the chooser', 'Returns to the planner without replacing a meal.']],
    note: 'An older favourite may show only its name if its recipe details were never saved. If you still have that recipe in your plan, save it again to keep the details.',
  },
  {
    id: 'own-recipes', title: 'Add your own recipe', summary: 'Keep a family recipe just for you.', screen: 'favourites', screenLabel: 'Open Favourites',
    steps: ['In Favourites or Meals, tap Add your own recipe. Add a name, servings, preparation time and cooking time.', 'Add at least two measured ingredients and two cooking steps. Each ingredient needs a name, amount and unit. A nutrition note is optional.', 'Choose Save to favourites only, or select a day in the displayed week. Tap Save recipe to favourites.'],
    buttons: [['Add ingredient / Add instruction', 'Adds another ingredient or cooking step to the form.'], ['Bin beside an ingredient or step', 'Removes that row. The form keeps a minimum of two ingredients and two instructions.'], ['Save to favourites only', 'Keeps the recipe without changing your current meal plan.'], ['A day in the recipe form', 'Also uses this recipe on that day in the currently selected week.'], ['Save recipe to favourites', 'Checks the required fields, saves your personal recipe and adds it to Favourites.'], ['Previously saved recipe', 'Loads that recipe into the form so you can use or update it. Saving with the same name updates that personal recipe.'], ['X', 'Closes the form. Save first if you want to keep your new changes.']],
    note: 'Preparation time, cooking time and servings must currently be greater than zero. Saving your recipe does not submit it to the community.',
  },
  {
    id: 'cooking', title: 'Read a recipe and cook', summary: 'Follow one cooking step at a time.', screen: 'plan', screenLabel: 'Open Meals',
    steps: ['Tap View recipe. Check the ingredients, preparation time and cooking time before you begin.', 'Tap Start Cooking Mode for one large instruction at a time. Use Next and Previous at your own pace.', 'On the final step, tap Finish cooking. When you opened the recipe from a planned day, that day is marked cooked.'],
    buttons: [['Start Cooking Mode', 'Shows one instruction at a time in larger text. It does not start an oven or a timer.'], ['Next / Previous', 'Moves through instructions. Nothing advances automatically.'], ['Finish cooking', 'Returns to the recipe overview and marks the planned meal cooked. Viewing a recipe from Favourites does not mark a planner day.'], ['Save as favourite', 'Keeps the recipe for later.'], ['Add missing ingredients', 'Opens the shopping list for your current plan. To shop for a favourite, put it on a planner day first.'], ['Suggest another recipe', 'Requests a replacement for the planned day. It is unavailable when simply viewing a favourite.'], ['X', 'Closes the recipe and cooking view.']],
    note: 'Recipe times and nutrition notes are guides. Check that the cooking method and ingredients work for your household.',
  },
  {
    id: 'shopping', title: 'Use your shopping list', summary: 'See what to buy and tick it off.', screen: 'shop', screenLabel: 'Open Shopping',
    steps: ['Open Shopping or tap Build shopping list. Items are grouped by department and combined across your plan. Items listed in your pantry are left out.', 'Tick an item when you have bought it. Tap its tick again to undo. Check the quantity you actually need before buying.', 'If you want to send the remaining list to someone, tap Share via WhatsApp. WhatsApp opens so you can choose who receives it.'],
    buttons: [['Item checkbox', 'Marks that shopping item bought. It is left out of the shared remaining list. It does not add it to your pantry automatically.'], ['Store buttons', 'Selects the store used for the sample-special display. It does not place an order.'], ['Shop across multiple stores', 'Lets you select more than one store. Turn it off to use one store.'], ['Sample special', 'Shows the sample store information. These are examples, not verified live offers or prices.'], ['Share via WhatsApp / Share remaining list via WhatsApp', 'Opens WhatsApp with unchecked shopping items. You choose the recipient and send it yourself.'], ['X on a sponsored advert', 'Hides that advert for the current session.']],
    note: 'The list includes every meal in your current plan, not just approved meals. Review pantry items and quantities before shopping.',
  },
  {
    id: 'settings', title: 'Make the app more comfortable', summary: 'Adjust movement, contrast and text size.', screen: 'settings', screenLabel: 'Open Settings',
    steps: ['Open Settings. Start with the one option that would help you most.', 'Turn on Calm mode for a steadier screen, High contrast for stronger separation, or Large text for bigger writing.', 'Try the setting on another page. You can return and switch it off at any time.'],
    buttons: [['Calm mode', 'Reduces movement in the interface. This choice is saved on this device.'], ['High contrast', 'Strengthens the contrast between text, controls and backgrounds. This currently resets when the app restarts.'], ['Large text', 'Increases text size throughout the app. This currently resets when the app restarts.']],
    note: 'There is no correct combination. Choose whatever feels easier to read and use.',
  },
  {
    id: 'sharing', title: 'Keep recipes private or share', summary: 'Sharing is always your choice.', screen: 'favourites', screenLabel: 'Open Favourites',
    steps: ['Your own recipes and favourites are saved on this device. Saving one does not upload it to the community.', 'If you want to share a personal recipe, open Favourites and expand Share with the MealBridge community on its card.', 'Read the explanation first. Only tap I give permission — submit this recipe if you want those recipe details sent.'],
    buttons: [['Share with the MealBridge community', 'Expands an optional explanation. Opening it does not submit anything.'], ['I give permission — submit this recipe', 'Sends the recipe details for review, without your household or pantry information. This connection is not active in the current test build.'], ['Submission unavailable message', 'No submission was confirmed. Your private recipe remains saved. You can try again when community sharing is available.']],
    note: 'Community sharing still needs its backend enabled. Recipes are submitted for review rather than published automatically. Device-local favourites do not sync between phones.',
  },
];
