export const SESSION_STORAGE_KEYS = {
  adSlots: 'mb-ad-slots',
  dismissedAds: 'mb-dismissed-ads',
} as const

export const loadSessionStorage = <T>(
  key: string,
  fallback: T,
): T => {
  try {
    const stored = sessionStorage.getItem(key)

    if (stored === null) {
      return fallback
    }

    return JSON.parse(stored) as T
  } catch {
    return fallback
  }
}

export const saveSessionStorage = (
  key: string,
  value: unknown,
): void => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Session persistence failure must never prevent MealBridge from running.
  }
}
