import PokemonImageModel from '../pokemonImageModel/PokemonImageModel'
import Style from './score.module.css'

export default function Score({ dataUser, setShowScore }) {
  return (
    <div className={Style.score}>
      <h3>o pokémon é: {dataUser.userPokemon.correctAnswer}</h3>
      <PokemonImageModel pokemonImage={dataUser.userPokemon.img}/>
      <p>você fez <span className={Style.points}>{dataUser.score}</span> pontos</p>
      <button onClick={() => setShowScore(prev => !prev)}>voltar</button>
    </div>
  )
}