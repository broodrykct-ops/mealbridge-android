import { CookingPot } from 'lucide-react'
import { EmptyState } from '../../components/ui/EmptyState'

export function RecipesPage() {
  return (
    <EmptyState
      icon={<CookingPot size={32} />}
      title="Your recipes"
      description="MealBridge's offline recipe library and personal recipes will appear here."
    />
  )
}
