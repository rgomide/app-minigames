import React, { useState } from 'react';
import { Image, TouchableOpacity, StyleSheet, ScrollView, View, Text } from 'react-native';
// import '../components/visual/MainMenuScreenVisual.css';
import {
  ANAGRAMA_START_SCREEN,
  ASSOCIACAO_START_SCREEN,
  FORCA_START_SCREEN,
  QUIZ_START_SCREEN
} from '../constants/screens.js';

// Import all images at the top of the file
const iconeAnagrama = require('../img/icone_anagrama.png');
const iconeAssociacao = require('../img/icone_associacao.png');
const iconeForca = require('../img/icone_forca.png');
const iconeQuiz = require('../img/icone_quiz.png');
const playIcon = require('../img/play.png');

// Create an object to map game names to their respective icons
const gameIcons = {
  Anagrama: iconeAnagrama,
  Associação: iconeAssociacao,
  Forca: iconeForca,
  Quiz: iconeQuiz,
};

const GameCard = ({ gameName, description, onPlay, bgColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.gameCard,
          isExpanded && styles.expanded,
          { backgroundColor: bgColor }
        ]}
        onPress={handleExpand}
      >
        <View style={styles.gameIcon}>
          <Image source={gameIcons[gameName]} style={styles.gameIconImg} />
        </View>
        <Text style={styles.gameTitle}>{gameName}</Text>

        {isExpanded && (
          <View style={styles.gameDescriptionContainer}>
            <Text style={styles.gameDescription}>{description}</Text>
            <TouchableOpacity
              onPress={onPlay}
            >
              <Image source={playIcon} style={styles.playIcon} />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gameMenu: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  gameMenuContainer: {
    paddingVertical: 50,
    gap: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameCard: {
    borderRadius: 20,
    padding: 30,
    textAlign: 'center',
    width: 260,
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  gameIcon: {
    fontSize: 50,
    marginBottom: 20
  },
  gameIconImg: {
    width: 160,
    height: 100
  },
  gameTitle: {
    fontSize: 22,
    fontWeight: '600',
    textTransform: 'uppercase',
    fontFamily: 'Poppins',
    letterSpacing: 1.2,
    marginBottom: 10
  },
  gameDescription: {
    fontFamily: 'Poppins',
    borderRadius: 8,
    color: 'white',
  },
  playIcon: {
    width: 60,
    height: 60,
    cursor: 'pointer',
    marginTop: 15,
  },
  gameDescriptionContainer: {
    width: '100%',
    borderRadius: 8,    
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})


const MainMenuScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.gameMenu} contentContainerStyle={styles.gameMenuContainer}>
      <GameCard
        gameName="Anagrama"
        iconSrc="icone_anagrama.png"
        description="Forme palavras a partir de letras embaralhadas."
        bgColor="#F2B263"
        onPlay={() => navigation.navigate(ANAGRAMA_START_SCREEN)}
      />

      <GameCard
        gameName="Associação"
        iconSrc="icone_associacao.png"
        description="Associe corretamente os pares."
        bgColor="#709387"
        onPlay={() => navigation.navigate(ASSOCIACAO_START_SCREEN)}
      />

      <GameCard
        gameName="Forca"
        iconSrc="icone_forca.png"
        description="Acerte a palavra oculta antes que seja enforcado."
        bgColor="#F28585"
        onPlay={() => navigation.navigate(FORCA_START_SCREEN)}
      />

      <GameCard
        gameName="Quiz"
        iconSrc="icone_quiz.png"
        description="Responda perguntas e teste seus conhecimentos."
        bgColor="#A99BE0"
        onPlay={() => navigation.navigate(QUIZ_START_SCREEN)}
      />
    </ScrollView>
  );
};

export default MainMenuScreen;
