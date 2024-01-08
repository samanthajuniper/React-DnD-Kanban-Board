import { ChakraProvider } from '@chakra-ui/react';

import Header from './ViewLayout/Header';
import TaskBoard from '../views/TaskBoard';
import primaryLightTheme from 'themes/primaryLight';

export default function App() {
  return (
    <>
      <ChakraProvider theme={primaryLightTheme}>
        <Header />
        <TaskBoard />
      </ChakraProvider>
    </>
  );
}
