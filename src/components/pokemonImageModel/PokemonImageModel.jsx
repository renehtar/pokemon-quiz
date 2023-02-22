import Style from './pokemonImageModel.module.css'

export default function PokemonImageModel({ pokemonImage, pokemonStyle={} }) {
  return (
    <div className={Style.imageContainer}>
      <img className={Style.pokemonImage} style={pokemonStyle} src={pokemonImage} alt="" />
      <img className={Style.backgroundPokemonImage} src='https://static.quizur.com/i/b/57d068428e7c45.8366828557d06842741a94.19377694.png' alt="" />
    </div>
  )
}
