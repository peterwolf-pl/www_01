import { useMemo } from 'react';
import CardNav from './components/CardNav.jsx';
import Hyperspeed from './components/Hyperspeed.jsx';
import MagicBento from './components/MagicBento.jsx';
import { hyperspeedPresets } from './components/hyperspeedPresets.js';

const navItems = [
  { label: 'Start', description: 'Wprowadzenie i skrót najważniejszych informacji.' },
  { label: 'Funkcje', description: 'Poznaj moduły dostępne w platformie.' },
  { label: 'Integracje', description: 'Sprawdź, z czym możemy współpracować.' },
  { label: 'Wsparcie', description: 'Dowiedz się, jak możemy Ci pomóc.' },
];

const highlights = [
  {
    title: 'Analityka w czasie rzeczywistym',
    description: 'Śledź najważniejsze wskaźniki i reaguj zanim konkurencja zauważy zmiany.',
    accent: 'Aktywne monitorowanie',
  },
  {
    title: 'Automatyzacje i przepływy',
    description: 'Zaprojektuj inteligentne procesy, które wykonają powtarzalne zadania za Ciebie.',
    accent: 'Oszczędność czasu',
  },
  {
    title: 'Współpraca zespołowa',
    description: 'Zapraszaj współpracowników, dziel się tablicami i pracuj w jednym miejscu.',
    accent: 'Zgrane zespoły',
  },
  {
    title: 'Bezpieczeństwo klasy enterprise',
    description: 'Zabezpieczenia wielopoziomowe, zgodność z RODO oraz audyty w standardzie.',
    accent: 'Spokój głowy',
  },
];

function App() {
  const hyperspeedOptions = useMemo(
    () => ({
      ...hyperspeedPresets.one,
      lightStickWidth: [...hyperspeedPresets.one.lightStickWidth],
      lightStickHeight: [...hyperspeedPresets.one.lightStickHeight],
      movingAwaySpeed: [...hyperspeedPresets.one.movingAwaySpeed],
      movingCloserSpeed: [...hyperspeedPresets.one.movingCloserSpeed],
      carLightsLength: [...hyperspeedPresets.one.carLightsLength],
      carLightsRadius: [...hyperspeedPresets.one.carLightsRadius],
      carWidthPercentage: [...hyperspeedPresets.one.carWidthPercentage],
      carShiftX: [...hyperspeedPresets.one.carShiftX],
      carFloorSeparation: [...hyperspeedPresets.one.carFloorSeparation],
      colors: {
        ...hyperspeedPresets.one.colors,
        leftCars: [...hyperspeedPresets.one.colors.leftCars],
        rightCars: [...hyperspeedPresets.one.colors.rightCars],
      },
    }),
    []
  );

  return (
    <div className="app">
      <div className="hyperspeed-wrapper" aria-hidden="true">
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>
      <div className="content">
        <header className="header">
          <CardNav items={navItems} />
        </header>
        <main className="main" aria-labelledby="magic-bento">
          <MagicBento id="magic-bento" items={highlights} />
        </main>
        <footer className="footer">
          <p className="footer__caption">
            Ten szkielet korzysta z inspiracji komponentami Reactbits, zapewniając solidną bazę pod
            dalszy rozwój.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
