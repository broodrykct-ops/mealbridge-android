import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { HomePage } from '../features/home/HomePage'
import { PlannerPage } from '../features/planner/PlannerPage'
import { ShoppingPage } from '../features/shopping/ShoppingPage'
import { PantryPage } from '../features/pantry/PantryPage'
import { RecipesPage } from '../features/recipes/RecipesPage'
import { SettingsPage } from '../features/settings/SettingsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/shopping" element={<ShoppingPage />} />
        <Route path="/pantry" element={<PantryPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
