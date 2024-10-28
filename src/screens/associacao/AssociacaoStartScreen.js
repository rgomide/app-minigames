import React, { useState } from 'react';
import { View, Text, Picker, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getAssociacao } from '../../services/associacao/associacaoService';
import { ASSOCIACAO_GAME_SCREEN } from '../../constants/screens';
import TooltipIcon from '../../components/TooltipIcon'; // Substituição do ícone de dúvida

const AssociacaoStartScreen = (props) => {
  const navigation = props.navigation;
  const [selectedAssociacao, setSelectedAssociacao] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const associacaoList = [
    { label: 'Animais e Habitats', value: 'associacao01' },
    { label: 'Instrumentos Musicais e Sons', value: 'associacao02' },
    { label: 'Países e Continentes', value: 'associacao03' }
  ];

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const startAssociacao = async () => {
    const associacao = await getAssociacao(selectedAssociacao);
    const selectedThemeLabel = associacaoList.find(option => option.value === selectedAssociacao)?.label;
    navigation.navigate(ASSOCIACAO_GAME_SCREEN, { associacaoSettings: associacao, selectedTheme: selectedThemeLabel });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <TooltipIcon text="Relacione os itens da coluna da direita com os itens da coluna da esquerda." />
      

      <Text style={styles.title}>ASSOCIAÇÃO</Text>

      <Text style={styles.label}>Selecione o tema:</Text>

      <Picker
        selectedValue={selectedAssociacao}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedAssociacao(itemValue)}
      >
        <Picker.Item label="Selecione um tema..." value="" />
        {associacaoList.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>

      <TouchableOpacity
        style={selectedAssociacao ? styles.startButton : styles.startButtonDisabled}
        disabled={!selectedAssociacao}
        onPress={startAssociacao}
      >
        <Text style={styles.buttonText}>Iniciar Associação</Text>
      </TouchableOpacity>
    </ScrollView>
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
    fontFamily: 'Fredoka One',
    marginBottom: 16,
    color: '#5d7370',
  },
  label: {
    fontSize: 20,
    marginBottom: 16,
    color: '#333333',
    fontFamily: 'Fredoka One',
  },
  picker: {
    height: 45,
    width: '100%',
    maxWidth: 350,
    marginBottom: 20,
    backgroundColor: '#91c1bb',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Fredoka One',
  },
  startButton: {
    alignItems: 'center',
    backgroundColor: '#91c1bb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    maxWidth: 350,
    width: '100%',
    marginTop: 10,
  },
  startButtonDisabled: {
    alignItems: 'center',
    backgroundColor: '#7c9a96',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    maxWidth: 350,
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'Fredoka One',
  }
});

export default AssociacaoStartScreen;
