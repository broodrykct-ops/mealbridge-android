import { Database, ShieldCheck, Smartphone } from 'lucide-react'

export function SettingsPage() {
  return (
    <div className="page-stack">
      <section>
        <p className="eyebrow">Application</p>
        <h2>Settings</h2>
        <p className="muted">
          MealBridge is being designed as a private, offline-first Android app.
        </p>
      </section>

      <section className="settings-list">
        <article className="settings-row">
          <Smartphone size={23} />
          <div>
            <strong>Device-first</strong>
            <span>Your core features will work without an internet connection.</span>
          </div>
        </article>

        <article className="settings-row">
          <Database size={23} />
          <div>
            <strong>Local database</strong>
            <span>Household and meal data will be stored on this device.</span>
          </div>
        </article>

        <article className="settings-row">
          <ShieldCheck size={23} />
          <div>
            <strong>Private by design</strong>
            <span>No account or cloud service is required for V1.0.</span>
          </div>
        </article>
      </section>
    </div>
  )
}
