import { useEffect, useState, type ReactNode } from 'react'
import { initialiseDatabase } from '../../database/database'

interface DatabaseProviderProps {
  children: ReactNode
}

export function DatabaseProvider({
  children,
}: DatabaseProviderProps) {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    initialiseDatabase()
      .then(() => {
        if (active) {
          setReady(true)
        }
      })
      .catch((databaseError: unknown) => {
        const message =
          databaseError instanceof Error
            ? databaseError.message
            : 'The local database could not be started.'

        console.error(databaseError)

        if (active) {
          setError(message)
        }
      })

    return () => {
      active = false
    }
  }, [])

  if (error) {
    return (
      <main className="startup-screen">
        <h1>MealBridge could not start</h1>
        <p>{error}</p>
      </main>
    )
  }

  if (!ready) {
    return (
      <main className="startup-screen">
        <div className="startup-mark">MB</div>
        <h1>MealBridge SA</h1>
        <p>Preparing your kitchen…</p>
      </main>
    )
  }

  return children
}
