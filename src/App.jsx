import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import LandingTest from './landing_test.jsx';
import Oldresults from './Oldresults.jsx';
import Newtest from './Newtest.jsx';
import Mbtitest from './Mbtitest.jsx';
import HoroscopeForm from './HoroscopeForm.jsx';
import PalmReading from './PalmReading.jsx';
import MbtiResults from './MbtiResults.jsx';
import FinalResults from './FinalResults.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing / auth */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User dashboard */}
        <Route path="/landing_test" element={<LandingTest />} />
        <Route path="/oldresults" element={<Oldresults />} />
        <Route path="/newtest" element={<Newtest />} />

        {/* Test flow */}
        <Route path="/test" element={<Mbtitest />} />
        <Route path="/horoscope" element={<HoroscopeForm />} />
        <Route path="/palm" element={<PalmReading />} />
        <Route path="/mbti-results" element={<MbtiResults />} />
        <Route path="/final-results" element={<FinalResults />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

