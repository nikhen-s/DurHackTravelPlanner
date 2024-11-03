import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Onboarding from './pages/Onboarding/Onboarding';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './LandingPage';
import { Button } from '@chakra-ui/react';
import ItineraryRecommendationPage from './ItineraryRecommendation.js'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <ChakraProvider>
      <Navbar />
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/itineraryplanner" element={<ItineraryRecommendationPage />} />
          <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
      </ChakraProvider>
    </Router>
  );
}

export default App;
