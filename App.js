import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import MainMenuScreen from './src/screens/MainMenuScreen'
import QuizHomeScreen from './src/screens/quiz/QuizHomeScreen'
import { MAIN_MENU_SCREEN, QUIZ_HOME_SCREEN } from './src/contants/screens'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={MAIN_MENU_SCREEN} screenOptions={{ contentStyle: { backgroundColor: "#eee" } }}>
        <Stack.Screen name={MAIN_MENU_SCREEN} component={MainMenuScreen} options={{ title: 'Menu' }} />
        <Stack.Screen name={QUIZ_HOME_SCREEN} component={QuizHomeScreen} options={{ title: 'Quiz' }} key={Math.random().toString()} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}