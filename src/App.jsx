import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import Home from './components/Home/Home';
import ActivityCreate from './components/Form/ActivityCreate';
import Detail from './components/Detail/Detail';



function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/activities" element={<ActivityCreate />} />
          <Route path="/home/:id" element={<Detail />} />
        </Routes>
    </div>
  );
}

export default App;
