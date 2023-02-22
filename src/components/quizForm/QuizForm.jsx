import Style from './quizForm.module.css'
import quiz from '../../database'
import { CgPokemon } from 'react-icons/cg'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import PokemonImageModel from '../pokemonImageModel/PokemonImageModel'

export default function QuizForm({ setShowScore, setDataUser }) {
  const limitQuestions = 3
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])

  const {data: questions, isFetching} = useQuery('questions', async ()=>{
    const easyQuestions = quiz.easy.sort(() => 0.5 - Math.random()).slice(0, limitQuestions)
    const mediumQuestions = quiz.medium.sort(() => 0.5 - Math.random()).slice(0, limitQuestions)
    const hardQuestions = quiz.hard.sort(() => 0.5 - Math.random()).slice(0, limitQuestions)
    const pokemons = []
  
    for (let i = 0; i < 4; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 807)}`)
      const pokemon = await response.json()
      pokemons.push(pokemon)
    }
  
    const pokemonQuestion = getRandomPokemonQuestion(pokemons)
    
    return [...easyQuestions, ...mediumQuestions, ...hardQuestions, pokemonQuestion]
  },{
    refetchOnWindowFocus: false,
  })

  function getRandomPokemonQuestion(arrPokemons) {
    const chosenPokemon = arrPokemons[Math.floor(Math.random() * arrPokemons.length)]

    return {
      question: 'quem é esse pokémon?',
      answers: arrPokemons.map(pokemon => pokemon.name),
      correctAnswer: chosenPokemon.name,
      img: chosenPokemon.sprites.front_default
    }
  }

  const handleSubmint = (e)=>{
    e.preventDefault()
    const data = new FormData(e.target)
    const result = Object.fromEntries(data.entries())
    setCurrentQuestion(prev => prev + 1)
    setUserAnswers(prev => [...prev, !isNaN(result.userAnswer) ? +result.userAnswer : result.userAnswer])
  }
  
  useEffect(()=>{
    if(!isFetching && currentQuestion === questions.length){
      setDataUser({userPokemon: questions[questions.length - 1], score: questions.reduce((acc, question, i) => question.correctAnswer === userAnswers[i] ? acc + 1 : acc, 0)})
      setShowScore(true)
    }
  },[userAnswers])

  return (
    <form className={Style.form} onSubmit={handleSubmint}>
      <fieldset>
        {isFetching && <p className={Style.loading}>carregando... <CgPokemon className={Style.loadingBall} /></p>}
        {!isFetching && questions?.length === 0 && <p>não foi possível carregar os dados. Por favor, recarregue a página.</p>}
        {!isFetching && questions.length > 0 && currentQuestion !== questions.length &&
        <>
          <legend>
            <h1>pokémon quiz</h1>
            <img src="https://cdn-icons-png.flaticon.com/512/287/287221.png" alt="icon de uma pokebola" />
          </legend>

          <div className={Style.questionBox}>
            {questions[currentQuestion].img && 
              <div className={Style.pokemonImageBox}>
                <PokemonImageModel pokemonImage={questions[currentQuestion].img} pokemonStyle={{filter: 'brightness(0)'}}/>
              </div>
            }
            <h2 className={Style.questionTitle}>{questions[currentQuestion].question}</h2>
            <span className={Style.currentQuestion} style={{background: `hsl(${questions.length - userAnswers.length}0deg 100% 42%)`}}>{`${currentQuestion + 1}/${questions.length}`}</span>
          </div>

          <ul className={Style.answerBox}>
            {questions[currentQuestion].answers.map(answer => (
              <li className={Style.answer} key={answer}>
                <label>
                  <p>{answer}</p>
                  <input type="radio" name="userAnswer" value={answer} required/>
                  <CgPokemon />
                </label>
              </li>
            ))}
          </ul>

          <div className={Style.buttonBox}>
            <button type='submit'>avançar</button>
          </div>
        </>
        }

      </fieldset>
    </form>
  )
}