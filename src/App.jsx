import CardNav from './components/CardNav.jsx';
import LightRays from './components/LightRays.jsx';
import MagicBento from './components/MagicBento.jsx';

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
  return (
    <div className="app">
      <div className="light-rays-wrapper" aria-hidden="true">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
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
