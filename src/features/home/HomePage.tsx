import { CalendarCheck, ChefHat, ShoppingBasket } from 'lucide-react'

export function HomePage() {
  return (
    <div className="page-stack">
      <section className="welcome-card">
        <p className="eyebrow">Welcome to your kitchen</p>
        <h2>Plan meals without the mental load.</h2>
        <p>
          MealBridge will help your household plan affordable meals, use what
          you already have and shop with purpose.
        </p>
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Today</p>
            <h2>Your MealBridge</h2>
          </div>
        </div>

        <div className="dashboard-grid">
          <article className="dashboard-card">
            <CalendarCheck size={26} />
            <strong>No meal planned</strong>
            <span>Start your first weekly plan.</span>
          </article>

          <article className="dashboard-card">
            <ShoppingBasket size={26} />
            <strong>Shopping list empty</strong>
            <span>Add items manually or from a meal plan.</span>
          </article>

          <article className="dashboard-card dashboard-card-wide">
            <ChefHat size={26} />
            <strong>Recipes coming next</strong>
            <span>
              Your offline recipe collection will live safely on this device.
            </span>
          </article>
        </div>
      </section>
    </div>
  )
}
