import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import MainMenuScreen from './src/screens/MainMenuScreen'
import QuizStartScreen from './src/screens/quiz/QuizStartScreen'
import QuizGameScreen from './src/screens/quiz/QuizGameScreen'
import QuizResultScreen from './src/screens/quiz/QuizResultScreen'

import { MAIN_MENU_SCREEN, QUIZ_START_SCREEN, QUIZ_GAME_SCREEN, QUIZ_RESULT_SCREEN } from './src/constants/screens'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={MAIN_MENU_SCREEN} screenOptions={{ contentStyle: { backgroundColor: "#eee" } }}>
        <Stack.Screen name={MAIN_MENU_SCREEN} component={MainMenuScreen} options={{ title: 'Menu' }} />
        <Stack.Group>
          <Stack.Screen
            name={QUIZ_START_SCREEN}
            component={QuizStartScreen}
            options={{ title: 'Quiz' }}
          />
          <Stack.Screen
            name={QUIZ_GAME_SCREEN}
            component={QuizGameScreen}
            options={{ title: 'Quiz' }}
          />
          <Stack.Screen
            name={QUIZ_RESULT_SCREEN}
            component={QuizResultScreen}
            options={{ title: 'Quiz' }}
          />
        </Stack.Group>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}