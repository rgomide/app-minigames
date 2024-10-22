import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import forcaData from '../../db/forca/forca01.json'
import '../../components/visual/ForcaStartVisual.css'
import infoIcon from '../../img/duvida.png' 

const SelectForcaThemeScreen = () => {
  const navigation = useNavigation()
  const [selectedTheme, setSelectedTheme] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const handleStartGame = () => {
    const temaSelecionado = forcaData.forca.temas.find((t) => t.tema === selectedTheme)
    if (temaSelecionado) {
      navigation.navigate('ForcaGameScreen', { tema: temaSelecionado })
    }
  }

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div className="container">
      <div className="info-icon" onClick={toggleInfo}>
        <img src={infoIcon} alt="Informação" />
      </div>


      <div className={`info-bubble ${showInfo ? 'show' : ''}`}>
        <p>Adivinhe a palavra secreta, antes de atingir os seis erros.</p>
      </div>

      <h1 className="title">FORCA</h1>

      <label className="label">Selecione o tema: </label>

      <select
        className="picker"
        value={selectedTheme}
        onChange={(e) => setSelectedTheme(e.target.value)}
      >
        <option value="">Selecione um tema</option>
        {forcaData.forca.temas.map((temaObj, index) => (
          <option key={index} value={temaObj.tema}>
            {temaObj.tema}
          </option>
        ))}
      </select>

      <button
        className="start-button"
        onClick={handleStartGame}
        disabled={!selectedTheme}
      >
        Iniciar Forca
      </button>
    </div>
  )
}

export default SelectForcaThemeScreen
