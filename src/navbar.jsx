import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

export default function Nav() {
  const navigate = useNavigate();

  const scrollToHow = () => {
    const el = document.getElementById('how-works');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goTo = (path) => {
    if (typeof navigate === 'function') navigate(path);
    else window.location.href = path;
  };

  return (
    <header className="site-header" role="banner">
      <div className="site-header__inner">
        <div className="logo" aria-label="Homepage">PersonaPath</div>

        <nav className="site-nav" aria-label="Main navigation">
          <button
            className="site-nav__link"
            type="button"
            onClick={scrollToHow}
            onKeyDown={(e) => { if (e.key === 'Enter') scrollToHow(); }}
          >
            How it works
          </button>

          <button
            className="site-nav__link"
            type="button"
            onClick={() => goTo('/login')}
            onKeyDown={(e) => { if (e.key === 'Enter') goTo('/login'); }}
          >
            Log in
          </button>

          <button
            className="site-nav__cta"
            type="button"
            onClick={() => goTo('/signup')}
            onKeyDown={(e) => { if (e.key === 'Enter') goTo('/signup'); }}
          >
            Sign up
          </button>
        </nav>
      </div>
    </header>
  );
}
