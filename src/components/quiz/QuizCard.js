import React, { useState } from 'react';
import '../../components/visual/QuizGameVisual.css'; // Importação do arquivo CSS
import CheckButtonGroup from '../CheckButtonGroup';

const QuizCard = ({ question, onChange }) => {
  const { title, answers } = question;
  const images = question.images || [];

  const [imageDimensions, setImageDimensions] = useState({});

  const handleImageLoadedEvent = (image, index) => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      let width = img.width;
      let height = img.height;
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
    };
  };

  return (
    <div className="quiz-card-main-view">
      {title.map((titleItem, index) => (
        titleItem.type === 'text' ? (
          <h2 key={index} className="quiz-card-title">{titleItem.value}</h2>
        ) : (
          <img
            key={index}
            src={titleItem.value}
            alt={`Imagem ${index}`}
          />
        )
      ))}
      <div className="quiz-card-images-view">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Imagem ${index}`}
            onLoad={() => handleImageLoadedEvent(image, index)}
            style={{
              width: imageDimensions[index]?.width || 80,
              height: imageDimensions[index]?.height || 80,
            }}
            className="quiz-card-image"
          />
        ))}
      </div>
      <p className="quiz-card-alternatives-label">Escolha uma das alternativas:</p>
      <div className="quiz-card-check-button-group-container">
        <CheckButtonGroup
          data={answers}
          imagesFieldName="images"
          titleFieldName="answer"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default QuizCard;
