import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import {Appearance} from 'react-native';

import {Navigation} from './src/navigation';

import theme from './src/theme';

const App = () => {
  const colorScheme = Appearance.getColorScheme();

  console.log(colorScheme);

  return (
    <ThemeProvider
      theme={colorScheme === 'light' ? theme.lightTheme : theme.darkTheme}>
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
