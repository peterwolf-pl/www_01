import PropTypes from 'prop-types';
import './Lanyard.css';

function Lanyard({ event, name, role, status, code }) {
  return (
    <div className="lanyard" aria-hidden="true">
      <div className="lanyard__straps">
        <span className="lanyard__strap lanyard__strap--left" />
        <span className="lanyard__strap lanyard__strap--right" />
        <span className="lanyard__clip" />
      </div>
      <div className="lanyard__card">
        <span className="lanyard__event">{event}</span>
        <span className="lanyard__name">{name}</span>
        {role ? <span className="lanyard__role">{role}</span> : null}
        {status ? <span className="lanyard__status">{status}</span> : null}
        <span className="lanyard__code">{code}</span>
      </div>
    </div>
  );
}

Lanyard.propTypes = {
  event: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
  status: PropTypes.string,
  code: PropTypes.string,
};

Lanyard.defaultProps = {
  event: 'Reactbits Live',
  name: 'Participant',
  role: '',
  status: '',
  code: 'RB-000',
};

export default Lanyard;
