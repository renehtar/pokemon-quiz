import Style from './App.module.css'
import { useState } from 'react'
import QuizForm from './components/quizForm/QuizForm'
import Score from './components/score/Score'

export default function App() {
  const [showScore, setShowScore] = useState(false)
  const [dataUser, setDataUser] = useState({})

  return (
    <div className={Style.app}>
      {!showScore ?
        <QuizForm setShowScore={setShowScore} setDataUser={setDataUser} />
      :
        <Score dataUser={dataUser} setShowScore={setShowScore}/>
      }
    </div>
  )
}
