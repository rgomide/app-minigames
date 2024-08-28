import { useState } from 'react'
import { Pressable, StyleSheet, Text, View, Image } from 'react-native'

const CheckButton = ({ titleFieldName, imagesFieldName, pressed, data, onChange }) => {
  const images = data[imagesFieldName] || []

  const [isPressed, setIsPressed] = useState(pressed)
  const [imageDimensions, setImageDimensions] = useState({})

  const togglePressed = () => {
    const newValue = !isPressed
    setIsPressed(newValue)

    onChange(data, newValue)
  }

  const handleImageLoadedEvent = (image, index) => {
    Image.getSize(
      image,
      (width, height) => {
        let higherDimension = width > height ? width : height
        const maxDimension = 200

        if (higherDimension > maxDimension) {
          const ratio = maxDimension / higherDimension
          width *= ratio
          height *= ratio
        }

        setImageDimensions((prevState) => ({
          ...prevState,
          [index]: { width, height }
        }))
      },
      (error) => {
        console.error(`Couldn't get the image size: ${error.message}`)
      }
    )
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
      <View style={styles.imagesView}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            onLoad={() => handleImageLoadedEvent(image, index)}
            style={[
              {
                width: imageDimensions[index]?.width || 50,
                height: imageDimensions[index]?.height || 50
              },
              styles.image
            ]}
          />
        ))}
      </View>
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
  },
  imagesView: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 5
  },
  image: {
    borderRadius: 5
  }
})

export default CheckButton
