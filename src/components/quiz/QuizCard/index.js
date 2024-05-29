import { Text, View } from 'react-native'
import CheckButtonGroup from '../../CheckButtonGroup'

const QuizCard = ({ question, onChange }) => {
  const { title, answers } = question

  console.log('QuizCard', question)

  return (
    <View>
      <Text>{title}</Text>
      <Text>Alternativas:</Text>
      <View>
        <CheckButtonGroup data={answers} titleFieldName="answer" onChange={onChange} />
      </View>
    </View>
  )
}

export default QuizCard
