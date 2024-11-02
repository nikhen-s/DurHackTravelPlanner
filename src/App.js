import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react';
function App() {
  return (
    <ChakraProvider>
    <div className="App">
      <p>Welcome to Durhack Team SlowPumaSomething</p>
      <Button>I am a Chakra UI Button</Button>
    </div>
    </ChakraProvider>
  );
}

export default App;
