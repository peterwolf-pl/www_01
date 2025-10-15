import PropTypes from 'prop-types';

function MagicBento({ id, items }) {
  return (
    <section className="magic-bento" id={id}>
      <div className="magic-bento__header">
        <p className="magic-bento__eyebrow">Magic Bento</p>
        <h1 className="magic-bento__title">Zbuduj doświadczenie, które zachwyci użytkowników</h1>
        <p className="magic-bento__subtitle">
          Poniższa siatka kart prezentuje kluczowe możliwości platformy. Każdy moduł można
          rozbudować o własne treści, grafiki i interakcje.
        </p>
      </div>
      <div className="magic-bento__grid">
        {items.map((item) => (
          <article key={item.title} className="magic-bento__card">
            <header className="magic-bento__card-header">
              <span className="magic-bento__accent">{item.accent}</span>
              <h2 className="magic-bento__card-title">{item.title}</h2>
            </header>
            <p className="magic-bento__card-description">{item.description}</p>
            <button type="button" className="magic-bento__action">
              Poznaj szczegóły
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

MagicBento.propTypes = {
  id: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      accent: PropTypes.string.isRequired,
    })
  ).isRequired,
};

MagicBento.defaultProps = {
  id: undefined,
};

export default MagicBento;
