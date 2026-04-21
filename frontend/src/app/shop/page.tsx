import styles from './Shop.module.css';

const plans = [
  {
    id: 'vip',
    name: 'VIP',
    price: '4.99',
    color: 'green',
    popular: false,
    description: 'Perfekt für den Einstieg. Zeige der Community deine Unterstützung.',
    features: [
      { text: 'VIP-Präfix im Chat', included: true },
      { text: '2x Spielzeit XP', included: true },
      { text: '/fly in der eigenen Heimat', included: true },
      { text: '2 Home-Punkte', included: true },
      { text: '5.000 Startcoins', included: true },
      { text: 'Benutzerdefinierter Nickname', included: false },
      { text: 'Particle-Effekte', included: false },
      { text: 'Zugang zu VIP-Warp', included: false },
    ],
  },
  {
    id: 'vip-plus',
    name: 'VIP+',
    price: '9.99',
    color: 'cyan',
    popular: true,
    description: 'Für tiefe Unterstützer. Mehr Komfort und Exklusiv-Features.',
    features: [
      { text: 'VIP+-Präfix im Chat', included: true },
      { text: '3x Spielzeit XP', included: true },
      { text: '/fly überall', included: true },
      { text: '5 Home-Punkte', included: true },
      { text: '15.000 Startcoins', included: true },
      { text: 'Benutzerdefinierter Nickname', included: true },
      { text: 'Particle-Effekte', included: true },
      { text: 'Zugang zu VIP-Warp', included: false },
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '19.99',
    color: 'gold',
    popular: false,
    description: 'Das ultimative Erlebnis. Alle Features und exklusiver Status.',
    features: [
      { text: 'Elite-Präfix im Chat (gold)', included: true },
      { text: '5x Spielzeit XP', included: true },
      { text: '/fly überall + /speed', included: true },
      { text: 'Unbegrenzte Home-Punkte', included: true },
      { text: '50.000 Startcoins', included: true },
      { text: 'Benutzerdefinierter Nickname', included: true },
      { text: 'Alle Particle-Effekte', included: true },
      { text: 'Zugang zu VIP-Warp', included: true },
    ],
  },
];

const extras = [
  { id: 'coins-1', name: '10.000 Coins', price: '1.99', icon: '🪙' },
  { id: 'coins-2', name: '50.000 Coins', price: '7.99', icon: '💰', popular: true },
  { id: 'coins-3', name: '200.000 Coins', price: '24.99', icon: '💎' },
  { id: 'kit-1', name: 'Diamond Starter Kit', price: '2.99', icon: '⚔️' },
];

export const metadata = {
  title: 'Shop',
  description: 'Unterstütze SigmaSMP und erhalte exklusive Ränge und Vorteile.',
};

export default function ShopPage() {
  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="page-hero">
          <div className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 2 1.5 4.5h9L18 2"/><path d="M3 11h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M12 11v12"/></svg>
            Donator Shop
          </div>
          <h1 className="section-title">Unterstütze <span className="highlight">SigmaSMP</span></h1>
          <p>Mit deiner Unterstützung hältst du den Server am Laufen und erhältst exklusive Vorteile.</p>
          <div className={styles.disclaimer}>
            ⚠️ Alle Käufe sind freiwillige Unterstützungen. Rückerstattungen nur bei technischen Problemen.
          </div>
        </div>

        {/* Plans */}
        <div className={styles.plans}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`${styles.planCard} ${styles[`plan${plan.color.charAt(0).toUpperCase() + plan.color.slice(1)}`]} ${plan.popular ? styles.planPopular : ''}`}
              id={`shop-plan-${plan.id}`}
            >
              {plan.popular && (
                <div className={styles.popularBadge}>
                  ⭐ Beliebteste Wahl
                </div>
              )}
              <div className={styles.planHeader}>
                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.planPrice}>
                  <span className={styles.planCurrency}>€</span>
                  <span className={styles.planAmount}>{plan.price}</span>
                  <span className={styles.planPeriod}>/einmalig</span>
                </div>
                <p className={styles.planDesc}>{plan.description}</p>
              </div>

              <ul className={styles.planFeatures}>
                {plan.features.map((feature, i) => (
                  <li key={i} className={`${styles.planFeature} ${feature.included ? '' : styles.planFeatureDisabled}`}>
                    <span className={styles.featureCheck}>
                      {feature.included ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      )}
                    </span>
                    {feature.text}
                  </li>
                ))}
              </ul>

              <button
                className={`${styles.buyBtn} ${plan.popular ? styles.buyBtnPrimary : ''}`}
                id={`buy-${plan.id}`}
              >
                Jetzt kaufen →
              </button>
            </div>
          ))}
        </div>

        {/* Extras */}
        <div className={styles.extrasSection}>
          <div className={styles.extrasHeader}>
            <h2 className={styles.extrasTitle}>Extras & Boosts</h2>
            <p className={styles.extrasDesc}>Einmalige Boosts und Items für sofortige Vorteile.</p>
          </div>
          <div className={styles.extrasGrid}>
            {extras.map((extra) => (
              <div key={extra.id} className={`${styles.extraCard} ${extra.popular ? styles.extraPopular : ''}`} id={`shop-extra-${extra.id}`}>
                {extra.popular && <span className={styles.extraBadge}>Beliebt</span>}
                <div className={styles.extraIcon}>{extra.icon}</div>
                <div className={styles.extraName}>{extra.name}</div>
                <div className={styles.extraPrice}>€{extra.price}</div>
                <button className={styles.extraBtn} id={`buy-extra-${extra.id}`}>Kaufen</button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className={styles.faq}>
          <h2 className={styles.faqTitle}>Häufige Fragen</h2>
          <div className={styles.faqGrid}>
            {[
              { q: 'Wann erhalte ich meinen Rang?', a: 'Dein Rang wird automatisch innerhalb von 5 Minuten nach dem Kauf auf dem Server aktiviert.' },
              { q: 'Ist Bezahlen sicher?', a: 'Ja, alle Zahlungen werden sicher über PayPal oder Stripe abgewickelt. Wir speichern keine Zahlungsdaten.' },
              { q: 'Verliere ich meinen Rang beim Reset?', a: 'Nein, Donator-Ränge bleiben dauerhaft erhalten, auch bei Economy-Resets.' },
            ].map((item, i) => (
              <div key={i} className={styles.faqItem}>
                <h3 className={styles.faqQ}>{item.q}</h3>
                <p className={styles.faqA}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
