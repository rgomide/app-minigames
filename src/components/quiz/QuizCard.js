import React, { useState } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import CheckButtonGroup from '../CheckButtonGroup'

const QuizCard = ({ question, onChange }) => {
  const { title, answers } = question

  const [imageDimensions, setImageDimensions] = useState({})

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

  return (
    <View style={styles.quizCardMainView}>
      {title.map((titleItem, index) =>
        titleItem.type === 'text' ? (
          <Text key={index} style={styles.quizCardTitle}>
            {titleItem.value}
          </Text>
        ) : (
          <Image
            key={index}
            source={titleItem.value}
            onLoad={() => handleImageLoadedEvent(titleItem.value, index)}
            style={[
              {
                width: imageDimensions[index]?.width || 80,
                height: imageDimensions[index]?.height || 80
              },
              styles.image
            ]}
          />
        )
      )}
      <Text style={styles.quizCardAlternativesLabel}>Escolha uma das alternativas:</Text>
      <View style={styles.quizCardCheckButtonGroupContainer}>
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
  quizCardMainView: {
    backgroundColor: '#877cb3',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    gap: 15
  },
  quizCardTitle: {
    fontSize: 26,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Fredoka'
  },
  quizCardImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover'
  },
  quizCardImagesView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10
  },
  quizCardAlternativesLabel: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Fredoka'
  },
  quizCardCheckButtonGroupContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    gap: 10
  },
  image: {
    borderRadius: 5,
    objectFit: 'contain'
  }
})

export default QuizCard
