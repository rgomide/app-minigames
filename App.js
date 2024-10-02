import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import MainMenuScreen from './src/screens/MainMenuScreen'

import AnagramaStartScreen from './src/screens/anagrama/AnagramaStartScreen'

import AssociacaoStartScreen from './src/screens/associacao/AssociacaoStartScreen'
import AssociacaoGameScreen from './src/screens/associacao/AssociacaoGameScreen'
import AssociacaoResultScreen from './src/screens/associacao/AssociacaoResultScreen'

import ForcaStartScreen from './src/screens/forca/ForcaStartScreen'

import QuizStartScreen from './src/screens/quiz/QuizStartScreen'
import QuizGameScreen from './src/screens/quiz/QuizGameScreen'
import QuizResultScreen from './src/screens/quiz/QuizResultScreen'

import {
  MAIN_MENU_SCREEN,
  QUIZ_START_SCREEN,
  QUIZ_GAME_SCREEN,
  QUIZ_RESULT_SCREEN,
  ANAGRAMA_START_SCREEN,
  ASSOCIACAO_START_SCREEN,
  ASSOCIACAO_GAME_SCREEN,
  ASSOCIACAO_RESULT_SCREEN,
  FORCA_START_SCREEN
} from './src/constants/screens'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={MAIN_MENU_SCREEN} screenOptions={{ contentStyle: { backgroundColor: "#eee" } }}>
        <Stack.Screen name={MAIN_MENU_SCREEN} component={MainMenuScreen} options={{ title: 'Menu' }} />
        <Stack.Group>
          <Stack.Screen
            name={ANAGRAMA_START_SCREEN}
            component={AnagramaStartScreen}
            options={{ title: 'Anagrama' }}
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
            options={{ title: 'Associação', headerLeft: () => <></> }}
          />
          <Stack.Screen
            name={ASSOCIACAO_RESULT_SCREEN}
            component={AssociacaoResultScreen}
            options={{ title: 'Associação', headerLeft: () => <></> }}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name={FORCA_START_SCREEN}
            component={ForcaStartScreen}
            options={{ title: 'Forca' }}
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
            options={{ title: 'Quiz', headerLeft: () => <></> }}
          />
          <Stack.Screen
            name={QUIZ_RESULT_SCREEN}
            component={QuizResultScreen}
            options={{ title: 'Quiz', headerLeft: () => <></> }}
          />
        </Stack.Group>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}