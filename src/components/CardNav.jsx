import PropTypes from 'prop-types';

function CardNav({ items }) {
  return (
    <nav className="card-nav" aria-label="Nawigacja sekcji">
      {items.map((item) => (
        <button key={item.label} className="card-nav__item" type="button">
          <span className="card-nav__label">{item.label}</span>
          <span className="card-nav__description">{item.description}</span>
        </button>
      ))}
    </nav>
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
