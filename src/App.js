import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Onboarding from './pages/Onboarding/Onboarding';
import Navbar from './components/Navbar/Navbar';
function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Onboarding />
    </ChakraProvider>
  );
}

export default App;
