import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import LandingPage from './LandingPage';
function App() {
  return (
    <ChakraProvider>
    <div className="App">
      <LandingPage />
    </div>
    </ChakraProvider>
  );
}

export default App;
