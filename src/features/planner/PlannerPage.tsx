import { CalendarDays } from 'lucide-react'
import { EmptyState } from '../../components/ui/EmptyState'

export function PlannerPage() {
  return (
    <EmptyState
      icon={<CalendarDays size={32} />}
      title="Your weekly planner"
      description="Meal planning and household portions will be added in MB-002."
    />
  )
}
