import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import {
  ANAGRAMA_START_SCREEN,
  ASSOCIACAO_START_SCREEN,
  FORCA_START_SCREEN,
  QUIZ_START_SCREEN
} from '../constants/screens.js'

const MainMenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(ANAGRAMA_START_SCREEN)}>
          <FontAwesome5 name="puzzle-piece" size={32} color="white" />
          <Text style={styles.buttonText}>Anagrama</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(ASSOCIACAO_START_SCREEN)}>
          <FontAwesome5 name="project-diagram" size={32} color="white" />
          <Text style={styles.buttonText}>Associação</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(FORCA_START_SCREEN)}>
          <FontAwesome5 name="gavel" size={32} color="white" />
          <Text style={styles.buttonText}>Forca</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(QUIZ_START_SCREEN)}>
          <FontAwesome5 name="question" size={32} color="white" />
          <Text style={styles.buttonText}>Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30, 
    width: '90%' 
  },
  button: {
    backgroundColor: '#007bff', 
    paddingVertical: 30, 
    paddingHorizontal: 20, 
    borderRadius: 12, 
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%' 
  },
  buttonText: {
    color: 'white',
    fontSize: 18, 
    marginTop: 10
  }
})

export default MainMenuScreen