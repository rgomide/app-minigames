import { StyleSheet, Text, View, Image } from 'react-native';
import CheckButtonGroup from '../CheckButtonGroup';
import { useState } from 'react';

const QuizCard = ({ question, onChange }) => {
  const { title, answers } = question;
  const images = question.images || [];

  const [imageDimensions, setImageDimensions] = useState({});

  const handleImageLoadedEvent = (image, index) => {
    Image.getSize(
      image,
      (width, height) => {
        let higherDimension = width > height ? width : height;
        const maxDimension = 260;

        if (higherDimension > maxDimension) {
          const ratio = maxDimension / higherDimension;
          width *= ratio;
          height *= ratio;
        }

        setImageDimensions((prevState) => ({
          ...prevState,
          [index]: { width, height },
        }));
      },
      (error) => {
        console.error(`Couldn't get the image size: ${error.message}`);
      }
    );
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.imagesView}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            onLoad={() => handleImageLoadedEvent(image, index)}
            style={[
              {
                width: imageDimensions[index]?.width || 50,
                height: imageDimensions[index]?.height || 50,
              },
              styles.image,
            ]}
          />
        ))}
      </View>
      <Text style={styles.alternativesLabel}>Alternativas:</Text>
      <View style={styles.checkButtonGroupContainer}>
        <CheckButtonGroup
          data={answers}
          imagesFieldName="images"
          titleFieldName="answer"
          onChange={onChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#877cb3', // Fundo lilás claro para o cartão
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 24,
    color: '#fff', // Cor branca para o título
    marginBottom: 20, // Mais espaço abaixo do título
    textAlign: 'center',
    fontFamily: 'Fredoka One, cursive', // Estilo de fonte animada
  },
  imagesView: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10, // Espaçamento entre as imagens
    marginBottom: 30, // Mais espaço abaixo das imagens
  },
  image: {
    borderRadius: 5,
  },
  alternativesLabel: {
    fontSize: 18,
    color: '#fff', // Cor branca para o texto "Alternativas"
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Fredoka One, cursive',
    marginTop: 30, // Adiciona espaço entre o enunciado e as alternativas
  },
  checkButtonGroupContainer: {
    marginTop: 20, // Adiciona espaço extra antes das alternativas
  },
});

export default QuizCard;
