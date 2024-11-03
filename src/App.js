import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import LandingPage from './LandingPage';
import ItineraryRecommendationPage from './ItineraryRecommendation';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <ChakraProvider>
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/itineraryplanner" element={<ItineraryRecommendationPage />} />
      </Routes>
      </ChakraProvider>
    </Router>
  );
}

export default App;
