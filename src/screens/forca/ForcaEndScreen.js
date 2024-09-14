import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ForcaEndScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { resultado } = route.params;

  return (
    <View>
      <Text>Você {resultado} o jogo!</Text>
      <Button 
        title="Jogar Novamente" 
        onPress={() => navigation.navigate('ForcaStartScreen')} 
      />
      <Button 
        title="Voltar ao Menu" 
        onPress={() => navigation.navigate('MainMenuScreen')} 
      />
    </View>
  );
};

export default ForcaEndScreen;
