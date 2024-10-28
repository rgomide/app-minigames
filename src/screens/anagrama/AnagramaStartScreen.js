import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { getAnagrama } from '../../services/anagrama/anagramaService';
import { ANAGRAMA_GAME_SCREEN } from '../../constants/screens';
import TooltipIcon from '../../components/TooltipIcon';

const AnagramaStartScreen = (props) => {
  const navigation = props.navigation;
  const [selectedAnagrama, setSelectedAnagrama] = useState('');

  const anagramaList = [
    { label: 'Geral 1', value: 'anagrama01' },
    { label: 'Geral 2', value: 'anagrama02' },
    { label: 'Geral 3', value: 'anagrama03' }
  ];

  const startAnagrama = async () => {
    const anagrama = await getAnagrama(selectedAnagrama);
    navigation.navigate(ANAGRAMA_GAME_SCREEN, { anagramaSettings: anagrama });
  };

  return (
    <View style={styles.container}>
        <TooltipIcon text="Reorganize as letras embaralhadas para formar palavras válidas." />

      <Text style={styles.title}>ANAGRAMA</Text>

      <Text style={styles.label}>Selecione o tema:</Text>

      <Picker
        selectedValue={selectedAnagrama}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedAnagrama(itemValue)}
      >
        <Picker.Item label="Selecione um tema..." value="" />
        {anagramaList.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>

      <TouchableOpacity
        style={selectedAnagrama ? styles.startButton : styles.startButtonDisabled}
        disabled={!selectedAnagrama}
        onPress={startAnagrama}
      >
        <Text style={styles.buttonText}>Iniciar Anagrama</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F2E8DF',
  },
  title: {
    fontSize: 50,
    fontFamily: 'Poppins',
    marginBottom: 16,
    color: '#f2b263',
  },
  label: {
    fontSize: 20,
    marginBottom: 16,
    color: '#333333',
    fontFamily: 'Poppins',
  },
  picker: {
    height: 45,
    width: '100%',
    maxWidth: 350,
    marginBottom: 20,
    backgroundColor: '#f7d0a1',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  startButton: {
    alignItems: 'center',
    backgroundColor: '#f2b263',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    maxWidth: 350,
    width: '100%',
    marginTop: 10,
  },
  startButtonDisabled: {
    alignItems: 'center',
    backgroundColor: '#f9e0c0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    maxWidth: 350,
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
});

export default AnagramaStartScreen;
