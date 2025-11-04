import React from 'react';
import Nav from './navbar.jsx';
import './App.css';

export default function App() {
  return (
    <div className="app-root">
      <Nav />

      {/* Hero + page content lives here (App.css controls layout & background) */}
      <main className="hero">
        <div className="hero__container">
          {/* left placeholder image */}
          <div className="hero-media hero-media--left">
            <img
              src="src\assets\59847-removebg-preview.png"
              alt="left placeholder"
              className="hero-image"
            />
          </div>

          <div className="hero__inner">
            <h1 className="hero__title">
              We help you know what you<br />
              <span>truly are</span>
            </h1>

            <p className="hero__subtitle">
              Our team helps you take our personalized personality and astrological test and use
              the deep insight about yourself for free.
            </p>

            <hr className="hero__divider" />
          </div>

          {/* right placeholder image */}
          <div className="hero-media hero-media--right">
            <img
              src="src\assets\horoscope_circle.jpeg"
              alt="right placeholder"
              className="hero-image"
            />
          </div>
        </div>

        <section className="section-intro">
          <div className="section-intro__content">
            <h2>The perfect fusion of personality and astrology</h2>
            <p>
              Combining the best of both worlds, we perform scientifically advanced analysis of
              your astrological birthdate as well as psychological answers to generate a deep and
              accurate reading specific to you.
            </p>
          </div>

          {/* intro illustration placeholder */}
          <div className="section-intro__media">
            <img
              src="src\assets\Feb-Business_9-removebg-preview.png"
              alt="intro placeholder"
              className="intro-image"
            />
          </div>
        </section>

        {/* How it works target */}
        <section id="how-works" className="how-it-works">
          <h2>How It Works</h2>
          <ol>
            <li>You take a personality test.</li>
            <li>We perform an analysis on your answers and provide tailored insights.</li>
          </ol>
        </section>
      </main>
    </div>
  );
}

