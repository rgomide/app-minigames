import { StyleSheet, Text, View, Image } from 'react-native'
import CheckButtonGroup from '../CheckButtonGroup'
import { useState } from 'react'

const QuizCard = ({ question, onChange }) => {
  const { title, answers } = question
  const images = question.images || []

  const [imageDimensions, setImageDimensions] = useState({})

  const handleImageLoadedEvent = (image, index) => {
    Image.getSize(
      image,
      (width, height) => {
        let higherDimension = width > height ? width : height
        const maxDimension = 260

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

  return (
    <View style={styles.mainView}>
      <Text>{title}</Text>
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
      <Text>Alternativas:</Text>
      <View>
        <CheckButtonGroup
          data={answers}
          imagesFieldName="images"
          titleFieldName="answer"
          onChange={onChange}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white'
  },
  imagesView: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5
  },
  image: {
    borderRadius: 5
  }
})

export default QuizCard
