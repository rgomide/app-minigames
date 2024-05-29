import { useState } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

const CheckButton = ({ titleFieldName, pressed, data, onChange }) => {
  const [isPressed, setIsPressed] = useState(pressed)

  const togglePressed = () => {
    const newValue = !isPressed
    setIsPressed(newValue)

    onChange(data, newValue)
  }

  const mainStyle = () => {
    const stylesArray = [styles.mainView]
    const styleBackground = pressed ? styles.pressed : styles.unpressed
    stylesArray.push(styleBackground)
    return stylesArray
  }

  return (
    <Pressable style={mainStyle()} onPress={togglePressed}>
      <Text>{data[titleFieldName]}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  mainView: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    padding: 15
  },
  pressed: {
    backgroundColor: 'lightblue'
  },
  unpressed: {
    backgroundColor: 'white'
  }
})

export default CheckButton
