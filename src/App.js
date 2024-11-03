import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react';
import ItineraryRecommendationPage from './ItineraryRecommendation.js'

function App() {
  return (
    <ChakraProvider>
    <div className="App">
      <ItineraryRecommendationPage></ItineraryRecommendationPage>
    </div>
    </ChakraProvider>
  );
}

export default App;
