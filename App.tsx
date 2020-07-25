import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import AppContainer from './screens/AppContainer';
import { store, persistor } from './store';
import { ThemeProvider } from 'react-native-elements';
import elementsTheme from './elementsTheme';
import { useFonts } from '@expo-google-fonts/inter';
import ScreenLoader from '_components/ScreenLoader';
import { Prompt_500Medium } from '@expo-google-fonts/dev';

console.disableYellowBox = true;

StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');
export default () => {
  const [fontsLoaded] = useFonts({ Prompt_500Medium });
  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={elementsTheme}>
            <AppContainer />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
  return <ScreenLoader visible />;
};
