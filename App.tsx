import {ThemeProvider} from '@shopify/restyle';
import React, { useEffect, useState} from 'react';
import {Appearance} from 'react-native';

import {Navigation} from './src/navigation';

import theme from './src/theme';

const App = () => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    setColorScheme(Appearance.getColorScheme())
  }, [colorScheme]);


  return (
    <ThemeProvider
      theme={colorScheme === 'dark' ? theme.darkTheme : theme.lightTheme}>
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
