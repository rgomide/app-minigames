import React, { useState } from 'react'
import '../../components/visual/AssociacaoStartVisual.css'
import { getAssociacao } from '../../services/associacao/associacaoService'
import { ASSOCIACAO_GAME_SCREEN } from '../../constants/screens'
import infoIcon from '../../img/duvida.png'

const AssociacaoStartScreen = (props) => {
  const navigation = props.navigation
  const [selectedAssociacao, setSelectedAssociacao] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const associacaoList = [
    { label: 'Animais e Habitats', value: 'associacao01' },
    { label: 'Instrumentos Musicais e Sons', value: 'associacao02' },
    { label: 'Países e Continentes', value: 'associacao03' }
  ]

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const startAssociacao = async () => {
    const associacao = await getAssociacao(selectedAssociacao)
    const selectedThemeLabel = associacaoList.find(option => option.value === selectedAssociacao)?.label
    navigation.navigate(ASSOCIACAO_GAME_SCREEN, { associacaoSettings: associacao, selectedTheme: selectedThemeLabel })
  }

  return (
    <div className="container">

      <div className="info-icon" onClick={toggleInfo}>
        <img src={infoIcon} alt="Informação" />
      </div>
      <div className={`info-bubble ${showInfo ? 'show' : ''}`}>
        <p>Relacione os itens da coluna da direita com os itens da coluna da esquerda.</p>
      </div>

      <h1 className="associacao-title">ASSOCIAÇÃO</h1>

      <p className="label">Selecione o tema:</p>

      <select
        className="associacao-picker"
        value={selectedAssociacao}
        onChange={(e) => setSelectedAssociacao(e.target.value)}
      >
        <option value="">Selecione um tema...</option>
        {associacaoList.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        className="associacao-start-button"
        disabled={!selectedAssociacao}
        onClick={startAssociacao}
      >
        Iniciar Associação
      </button>
    </div>
  )
}

export default AssociacaoStartScreen
