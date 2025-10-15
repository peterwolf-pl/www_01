import PropTypes from 'prop-types';

function CardNav({ items }) {
  return (
    <div className="card-nav-shell">
      <svg className="card-nav__defs" aria-hidden="true" focusable="false">
        <defs>
          <filter id="gooey-nav">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -16"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <nav className="card-nav" aria-label="Nawigacja sekcji">
        <div className="card-nav__gooey" aria-hidden="true">
          <span className="card-nav__blob card-nav__blob--one" />
          <span className="card-nav__blob card-nav__blob--two" />
          <span className="card-nav__blob card-nav__blob--three" />
        </div>
        {items.map((item) => (
          <button key={item.label} className="card-nav__item" type="button">
            <span className="card-nav__label">{item.label}</span>
            <span className="card-nav__description">{item.description}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

CardNav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CardNav;
