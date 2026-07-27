export type Person = {
  id: number
  name: string
  role: string
  age: string
  needs: string
  exclusions: string
  favourites: string
  textures: string
}

export type Meal = {
  name: string
  ingredients: string[]
  approved: boolean
  leftovers: boolean
  reason?: string
  prepTime?: number
  cookTime?: number
  servings?: number
  instructions?: string[]
  nutrition?: string
  custom?: boolean
}

export type DraftIngredient = {
  name: string
  amount: string
  unit: string
}

export type RecipeDraft = {
  name: string
  prepTime: string
  cookTime: string
  servings: string
  targetDay: number
  ingredients: DraftIngredient[]
  instructions: string[]
  nutrition: string
}

export type Tab = 'home' | 'family' | 'plan' | 'shop' | 'settings'

export type AdSlot = 'plan' | 'shop'

export type AdCampaign = {
  id: string
  title: string
  body: string
  category: string
  tags: string[]
  accent: string
}

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
}
