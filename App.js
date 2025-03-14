import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import MainMenuScreen from './src/screens/MainMenuScreen'


import AnagramaStartScreen from './src/screens/anagrama/AnagramaStartScreen'
import AnagramaGameScreen from './src/screens/anagrama/AnagramaGameScreen'
import AnagramaResultScreen from './src/screens/anagrama/AnagramaResultScreen'

import AssociacaoStartScreen from './src/screens/associacao/AssociacaoStartScreen'
import AssociacaoGameScreen from './src/screens/associacao/AssociacaoGameScreen'
import AssociacaoResultScreen from './src/screens/associacao/AssociacaoResultScreen'

import ForcaStartScreen from './src/screens/forca/ForcaStartScreen'
import ForcaGameScreen from "./src/screens/forca/ForcaGameScreen"
import ForcaEndScreen from "./src/screens/forca/ForcaEndScreen"

import QuizStartScreen from './src/screens/quiz/QuizStartScreen'
import QuizGameScreen from './src/screens/quiz/QuizGameScreen'
import QuizResultScreen from './src/screens/quiz/QuizResultScreen'

import {
  MAIN_MENU_SCREEN,
  QUIZ_GAME_SCREEN,
  QUIZ_START_SCREEN,
  QUIZ_RESULT_SCREEN,
  ANAGRAMA_START_SCREEN,
  ANAGRAMA_GAME_SCREEN,
  ANAGRAMA_RESULT_SCREEN,
  ASSOCIACAO_START_SCREEN,
  ASSOCIACAO_GAME_SCREEN,
  ASSOCIACAO_RESULT_SCREEN,
  FORCA_START_SCREEN,
  FORCA_GAME_SCREEN,
  FORCA_END_SCREEN
} from './src/constants/screens'

import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react'

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator()

export default function App() {
  const [fontsLoaded, error] = useFonts({
    'Poppins': require('./src/assets/fonts/Poppins-Regular.ttf'),
    'Fredoka': require('./src/assets/fonts/Fredoka.ttf')
  })

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={MAIN_MENU_SCREEN} screenOptions={{ contentStyle: { backgroundColor: "#F2E8DF" } }}>
        <Stack.Screen name={MAIN_MENU_SCREEN} component={MainMenuScreen} options={{ headerShown: false }} />
        <Stack.Group>
          <Stack.Screen
            name={ANAGRAMA_START_SCREEN}
            component={AnagramaStartScreen}
            options={{ title: 'Anagrama' }}
          />
          <Stack.Screen
            name={ANAGRAMA_GAME_SCREEN}
            component={AnagramaGameScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ANAGRAMA_RESULT_SCREEN}
            component={AnagramaResultScreen}
            options={{ headerShown: false }}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name={ASSOCIACAO_START_SCREEN}
            component={AssociacaoStartScreen}
            options={{ title: 'Associação' }}
          />
          <Stack.Screen
            name={ASSOCIACAO_GAME_SCREEN}
            component={AssociacaoGameScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ASSOCIACAO_RESULT_SCREEN}
            component={AssociacaoResultScreen}
            options={{ headerShown: false }}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name={FORCA_START_SCREEN}
            component={ForcaStartScreen}
            options={{ title: 'Forca' }}
          />
          <Stack.Screen
            name={FORCA_GAME_SCREEN}
            component={ForcaGameScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={FORCA_END_SCREEN}
            component={ForcaEndScreen}
            options={{ headerShown: false }}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name={QUIZ_START_SCREEN}
            component={QuizStartScreen}
            options={{ title: 'Quiz' }}
          />
          <Stack.Screen
            name={QUIZ_GAME_SCREEN}
            component={QuizGameScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={QUIZ_RESULT_SCREEN}
            component={QuizResultScreen}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}