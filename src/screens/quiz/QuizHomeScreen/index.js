import { createNativeStackNavigator } from '@react-navigation/native-stack'
import QuizStartScreen from '../QuizStartScreen'
import QuizGameScreen from '../QuizGameScreen'
import QuizResultScreen from '../QuizResultScreen'
import { QUIZ_GAME_SCREEN, QUIZ_RESULT_SCREEN, QUIZ_START_SCREEN } from '../../../contants/screens'

const Stack = createNativeStackNavigator()

const QuizHomeScreen = () => {
  return (
    <Stack.Navigator initialRouteName={QUIZ_START_SCREEN} screenOptions={{ headerShown: false }}>
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
    </Stack.Navigator>
  )
}

export default QuizHomeScreen
