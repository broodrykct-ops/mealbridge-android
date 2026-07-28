import { useEffect, useState } from 'react';
import App from './App';

export default function MealBridgeBootstrap() {
  const [showLaunch, setShowLaunch] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const holdTimer = window.setTimeout(() => setLeaving(true), 800);
    const removeTimer = window.setTimeout(() => setShowLaunch(false), 1100);

    return () => {
      window.clearTimeout(holdTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      <App />

      {showLaunch && (
        <div
          className={`mealbridge-launch ${leaving ? 'mealbridge-launch--leaving' : ''}`}
          aria-hidden="true"
        >
          <img
            className="mealbridge-launch__brand"
            src={`${import.meta.env.BASE_URL}icons/mealbridge-launch-v1.png`}
            alt=""
          />
        </div>
      )}
    </>
  );
}
