import { useState } from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'

const infoIcon = require('../img/duvida.png')

const TooltipIcon = ({ text }) => {
  const [showInfo, setShowInfo] = useState(false)

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.infoIcon} onPress={toggleInfo}>
        <Image style={styles.infoIcon} source={infoIcon} alt="Informação" />
      </TouchableOpacity>

      <View style={showInfo ? styles.infoBubbleShow : styles.infoBubbleHidden}>
        <Text>{text}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20
  },
  infoIcon: {
    alignSelf: 'flex-end',
    width: 40,
    height: 40,
    cursor: 'pointer'
  },
  infoBubbleHidden: {
    display: 'none'
  },
  infoBubbleShow: {
    backgroundColor: '#FFEE81',
    fontFamily: 'Fredoka',
    color: '#333333',
    padding: 10,
    paddingRight: 20,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20
  }
})

export default TooltipIcon
