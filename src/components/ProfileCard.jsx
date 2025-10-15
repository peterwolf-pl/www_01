import Lanyard from './Lanyard.jsx';
import './ProfileCard.css';

const socialIcons = {
  dribbble: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.76 9.76 0 0 0 12 2.25Zm6.88 8.12a16.62 16.62 0 0 0-5.31-.34 28.06 28.06 0 0 0-1.3-2.9 7.26 7.26 0 0 1 6.61 3.24ZM9.2 4.26a28.86 28.86 0 0 1 2.67 4.45 22.54 22.54 0 0 0-7.3 1.26 7.29 7.29 0 0 1 4.63-5.71ZM4.26 14.8a7.16 7.16 0 0 1 0-5.6 20.32 20.32 0 0 1 7.62-1.45 25.36 25.36 0 0 1 1.63 3.36 16.52 16.52 0 0 0-6.83 5.69 7.25 7.25 0 0 1-2.42-1ZM9.8 19.73a7.13 7.13 0 0 1-4-2.41 14.94 14.94 0 0 1 6.23-5 26.24 26.24 0 0 1 1.79 6.18 7.28 7.28 0 0 1-4.02 1.23Zm5.66-.73a27.54 27.54 0 0 0-1.64-5.64 14.76 14.76 0 0 1 4.72.6 7.26 7.26 0 0 1-3.08 5.04Z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34a2.65 2.65 0 0 0-1.11-1.46c-.91-.62.07-.6.07-.6a2.1 2.1 0 0 1 1.53 1 2.14 2.14 0 0 0 2.93.83 2.14 2.14 0 0 1 .63-1.34c-2.22-.25-4.55-1.11-4.55-4.94a3.88 3.88 0 0 1 1-2.68 3.6 3.6 0 0 1 .1-2.65s.84-.27 2.75 1a9.5 9.5 0 0 1 5 0c1.9-1.28 2.74-1 2.74-1a3.6 3.6 0 0 1 .11 2.65 3.87 3.87 0 0 1 1 2.68c0 3.85-2.34 4.68-4.57 4.93a2.4 2.4 0 0 1 .69 1.85v2.74c0 .26.18.57.69.47A10 10 0 0 0 12 2Z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 5.92a6.44 6.44 0 0 1-1.77.49 3.08 3.08 0 0 0 1.36-1.7 6.33 6.33 0 0 1-1.94.72 3.17 3.17 0 0 0-5.4 2.17 3.36 3.36 0 0 0 .08.73A9 9 0 0 1 4.5 4.9a3.16 3.16 0 0 0 1 4.23 3 3 0 0 1-1.44-.39v.04a3.17 3.17 0 0 0 2.54 3.11 3.2 3.2 0 0 1-1.44.05 3.17 3.17 0 0 0 3 2.19A6.36 6.36 0 0 1 3 16.51a8.94 8.94 0 0 0 4.85 1.42 9 9 0 0 0 9-9q0-.21-.01-.42A6.4 6.4 0 0 0 21 5.92Z" />
    </svg>
  ),
};

const ProfileCard = ({
  name = 'Natalia Wójcik',
  title = 'Lead Product Designer',
  location = 'Warszawa, Polska',
  summary = 'Projektuję doświadczenia, które łączą animacje, mikrointerakcje i klarowną strukturę informacji.',
  availability = 'Dostępna od lipca 2024',
  skills = ['Design systems', 'Motion UI', 'Accessibility', 'Workshops'],
  stats = [
    { label: 'Lata doświadczenia', value: '8+' },
    { label: 'Zrealizowane projekty', value: '45' },
    { label: 'Satisfaction score', value: '97%' },
  ],
  socials = [
    { label: 'Dribbble', url: '#', type: 'dribbble' },
    { label: 'GitHub', url: '#', type: 'github' },
    { label: 'Twitter', url: '#', type: 'twitter' },
  ],
}) => {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
  const badgeCode = `${initials}-${new Date().getFullYear().toString().slice(-2)}`;

  return (
    <div className="profile-card-combined">
      <Lanyard event="Reactbits Summit" name={name} role={title} status={availability} code={badgeCode} />
      <article className="profile-card" aria-labelledby="profile-card-name">
      <div className="profile-card__glow" aria-hidden="true" />
      <header className="profile-card__header">
        <div className="profile-card__avatar" aria-hidden="true">
          <span>{initials}</span>
        </div>
        <div className="profile-card__identity">
          <p className="profile-card__availability">{availability}</p>
          <h2 className="profile-card__name" id="profile-card-name">
            {name}
          </h2>
          <p className="profile-card__title">{title}</p>
          <p className="profile-card__location">{location}</p>
        </div>
      </header>
      <p className="profile-card__summary">{summary}</p>
      <ul className="profile-card__skills">
        {skills.map(skill => (
          <li key={skill} className="profile-card__skill">
            {skill}
          </li>
        ))}
      </ul>
      <dl className="profile-card__stats">
        {stats.map(stat => (
          <div key={stat.label} className="profile-card__stat">
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
      <div className="profile-card__actions">
        <a className="profile-card__primary" href="#" role="button">
          Zobacz portfolio
        </a>
        <div className="profile-card__socials" aria-label="Profile społecznościowe">
          {socials.map(social => (
            <a key={social.label} href={social.url} aria-label={social.label} className={`profile-card__social profile-card__social--${social.type}`}>
              {socialIcons[social.type]}
            </a>
          ))}
        </div>
      </div>
      </article>
    </div>
  );
};

export default ProfileCard;
