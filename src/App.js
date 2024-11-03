import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Onboarding from './pages/Onboarding/Onboarding';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './LandingPage';
import { Button } from '@chakra-ui/react';
import ItineraryRecommendationPage from './ItineraryRecommendation.js'

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Onboarding />
      <ItineraryRecommendationPage />
      <LandingPage />
    </ChakraProvider>
  );
}

export default App;
