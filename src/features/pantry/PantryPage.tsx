import { PackageOpen } from 'lucide-react'
import { EmptyState } from '../../components/ui/EmptyState'

export function PantryPage() {
  return (
    <EmptyState
      icon={<PackageOpen size={32} />}
      title="Your pantry"
      description="Track ingredients already available at home and reduce food waste."
    />
  )
}
