import React, { useState } from 'react'
import '../../components/visual/AnagramaStartVisual.css'
import { getAnagrama } from '../../services/anagrama/anagramaService'
import { ANAGRAMA_GAME_SCREEN } from '../../constants/screens'
import infoIcon from '../../img/duvida.png'

const AnagramaStartScreen = (props) => {
  const navigation = props.navigation
  const [selectedAnagrama, setSelectedAnagrama] = useState(null)
  const [showInfo, setShowInfo] = useState(false)

  const anagramaList = [
    { label: 'Geral 1', value: 'anagrama01' },
    { label: 'Geral 2', value: 'anagrama02' },
    { label: 'Geral 3', value: 'anagrama03' }
  ]

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const startAnagrama = async () => {
    const anagrama = await getAnagrama(selectedAnagrama)
    navigation.navigate(ANAGRAMA_GAME_SCREEN, { anagramaSettings: anagrama })
  }

  return (
    <div className="container">
      <div className="info-icon" onClick={toggleInfo}>
        <img src={infoIcon} alt="Informação" />
      </div>
      <div className={`info-bubble ${showInfo ? 'show' : ''}`}>
        <p>Reorganize as letras embaralhadas para formar palavras válidas.</p>
      </div>

      <h1 className="anagrama-title">ANAGRAMA</h1>

      <p className="label">Selecione o tema:</p>

      <select
        className="anagrama-picker"
        value={selectedAnagrama}
        onChange={(e) => setSelectedAnagrama(e.target.value)}
      >
        <option value="">Selecione um tema...</option>
        {anagramaList.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        className="anagrama-start-button"
        disabled={!selectedAnagrama}
        onClick={startAnagrama}
      >
        Iniciar Anagrama
      </button>
    </div>
  )
}

export default AnagramaStartScreen
