import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import LandingTest from './landing_test.jsx'
import Oldresults from './oldresults.jsx'
import Newtest from './Newtest.jsx'
import Mbtitest from './Mbtitest.jsx'
import MbtiResults from './MbtiResults.jsx'
import PalmReading from './PalmReading.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing_test" element={<LandingTest />} />
        <Route path="/test" element={<Newtest />} />
        <Route path="/mbti-test" element={<Mbtitest />} />
        <Route path="/mbti-results" element={<MbtiResults />} />
        <Route path="/palm-reading" element={<PalmReading />} />
        <Route path="/results" element={<Oldresults />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
