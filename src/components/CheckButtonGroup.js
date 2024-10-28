import { StyleSheet, View } from 'react-native'
import CheckButton from './CheckButton'

const CheckButtonGroup = ({ data, titleFieldName, imagesFieldName, onChange }) => {
  const onElementPressed = (item, pressed) => {
    if (pressed) {
      data.forEach((element) => {
        element.pressed = element.id === item.id
      })
      onChange(item)
    }
  }

  return (
    <View style={styles.mainView}>
      {data.map((item) => (
        <CheckButton
          key={item.id}
          titleFieldName={titleFieldName}
          imagesFieldName={imagesFieldName}
          pressed={item.pressed}
          data={item}
          onChange={onElementPressed}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    gap: 5
  }
})

export default CheckButtonGroup
