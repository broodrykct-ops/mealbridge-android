export const MEAL_FEEDBACK_STORAGE_KEY = 'mb-meal-feedback-v1';
export const MAX_FEEDBACK_EVENTS = 100;

export type MealFeedbackSignal =
  | 'approved'
  | 'replaced'
  | 'favourited';

export type MealFeedbackEvent = {
  id: string;
  mealName: string;
  signal: MealFeedbackSignal;
  ingredients: string[];
  timestamp: string;
};

export type MealFeedbackStore = {
  version: 1;
  events: MealFeedbackEvent[];
};

export type NewMealFeedbackEvent = Omit<
  MealFeedbackEvent,
  'id' | 'timestamp'
>;

const emptyMealFeedbackStore = (): MealFeedbackStore => ({
  version: 1,
  events: [],
});

const isFeedbackSignal = (
  value: unknown,
): value is MealFeedbackSignal =>
  value === 'approved' ||
  value === 'replaced' ||
  value === 'favourited';

const isFeedbackEvent = (
  value: unknown,
): value is MealFeedbackEvent => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const event = value as Partial<MealFeedbackEvent>;

  return (
    typeof event.id === 'string' &&
    event.id.length > 0 &&
    typeof event.mealName === 'string' &&
    event.mealName.length > 0 &&
    isFeedbackSignal(event.signal) &&
    Array.isArray(event.ingredients) &&
    event.ingredients.every(
      ingredient => typeof ingredient === 'string',
    ) &&
    typeof event.timestamp === 'string' &&
    event.timestamp.length > 0
  );
};

const normaliseStore = (
  value: unknown,
): MealFeedbackStore => {
  if (!value || typeof value !== 'object') {
    return emptyMealFeedbackStore();
  }

  const store = value as Partial<MealFeedbackStore>;

  if (
    store.version !== 1 ||
    !Array.isArray(store.events) ||
    !store.events.every(isFeedbackEvent)
  ) {
    return emptyMealFeedbackStore();
  }

  return {
    version: 1,
    events: store.events.slice(-MAX_FEEDBACK_EVENTS),
  };
};

export const loadMealFeedback = (): MealFeedbackStore => {
  try {
    const stored = localStorage.getItem(
      MEAL_FEEDBACK_STORAGE_KEY,
    );

    if (!stored) {
      return emptyMealFeedbackStore();
    }

    return normaliseStore(JSON.parse(stored));
  } catch {
    return emptyMealFeedbackStore();
  }
};

export const saveMealFeedback = (
  store: MealFeedbackStore,
): void => {
  try {
    const safeStore: MealFeedbackStore = {
      version: 1,
      events: store.events.slice(-MAX_FEEDBACK_EVENTS),
    };

    localStorage.setItem(
      MEAL_FEEDBACK_STORAGE_KEY,
      JSON.stringify(safeStore),
    );
  } catch {
    // Persistence failure must never prevent MealBridge from running.
  }
};

const createFeedbackId = (): string => {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }

  return `mb-feedback-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
};

export const addMealFeedbackEvent = (
  store: MealFeedbackStore,
  event: NewMealFeedbackEvent,
): MealFeedbackStore => {
  const nextEvent: MealFeedbackEvent = {
    ...event,
    id: createFeedbackId(),
    timestamp: new Date().toISOString(),
    ingredients: [...event.ingredients],
  };

  return {
    version: 1,
    events: [...store.events, nextEvent].slice(
      -MAX_FEEDBACK_EVENTS,
    ),
  };
};

export type MealFeedbackSummaryItem = {
  name: string;
  count: number;
};

export type MealFeedbackSummary = {
  approvedMeals: MealFeedbackSummaryItem[];
  favouritedMeals: MealFeedbackSummaryItem[];
  replacedMeals: MealFeedbackSummaryItem[];
  positiveIngredients: MealFeedbackSummaryItem[];
  replacedIngredients: MealFeedbackSummaryItem[];
};

const SUMMARY_LIMIT = 5;

const normaliseFeedbackName = (value: string): string =>
  value.trim().toLowerCase();

const rankFeedbackValues = (
  values: string[],
): MealFeedbackSummaryItem[] => {
  const counts = new Map<string, number>();

  values.forEach(value => {
    const name = normaliseFeedbackName(value);

    if (!name) {
      return;
    }

    counts.set(name, (counts.get(name) ?? 0) + 1);
  });

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort(
      (a, b) =>
        b.count - a.count || a.name.localeCompare(b.name),
    )
    .slice(0, SUMMARY_LIMIT);
};

export const summariseMealFeedback = (
  store: MealFeedbackStore,
): MealFeedbackSummary => {
  const approvedEvents = store.events.filter(
    event => event.signal === 'approved',
  );
  const favouritedEvents = store.events.filter(
    event => event.signal === 'favourited',
  );
  const replacedEvents = store.events.filter(
    event => event.signal === 'replaced',
  );

  const positiveEvents = [
    ...approvedEvents,
    ...favouritedEvents,
  ];

  return {
    approvedMeals: rankFeedbackValues(
      approvedEvents.map(event => event.mealName),
    ),
    favouritedMeals: rankFeedbackValues(
      favouritedEvents.map(event => event.mealName),
    ),
    replacedMeals: rankFeedbackValues(
      replacedEvents.map(event => event.mealName),
    ),
    positiveIngredients: rankFeedbackValues(
      positiveEvents.flatMap(event => event.ingredients),
    ),
    replacedIngredients: rankFeedbackValues(
      replacedEvents.flatMap(event => event.ingredients),
    ),
  };
};

export type MealFeedbackAiContext = {
  approvedMeals: string[];
  favouriteMeals: string[];
  replacedMeals: string[];
  positiveIngredients: string[];
  replacedIngredients: string[];
};

const formatSummaryItems = (
  items: MealFeedbackSummaryItem[],
): string[] =>
  items.map(item => `${item.name} (${item.count})`);

export const buildMealFeedbackAiContext = (
  store: MealFeedbackStore,
): MealFeedbackAiContext | null => {
  if (store.events.length === 0) {
    return null;
  }

  const summary = summariseMealFeedback(store);

  return {
    approvedMeals: formatSummaryItems(summary.approvedMeals),
    favouriteMeals: formatSummaryItems(
      summary.favouritedMeals,
    ),
    replacedMeals: formatSummaryItems(summary.replacedMeals),
    positiveIngredients: formatSummaryItems(
      summary.positiveIngredients,
    ),
    replacedIngredients: formatSummaryItems(
      summary.replacedIngredients,
    ),
  };
};
