import { ShoppingCart } from 'lucide-react'
import { EmptyState } from '../../components/ui/EmptyState'

export function ShoppingPage() {
  return (
    <EmptyState
      icon={<ShoppingCart size={32} />}
      title="Your shopping list"
      description="Build a practical list manually or generate it from planned meals."
    />
  )
}
