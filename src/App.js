import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

const [pokedex,setPokedex] = useState([])
const [wildPokemon,setWildPokemon] = useState({})

 useEffect(()=>{
     encounterWildPokemon()
 },[])

const pokeId= ()=>{
  const min = Math.ceil(1)
  const max = Math.floor(1151)
  return Math.floor(Math.random()*(max-min + 1)) + min
}
const encounterWildPokemon = async () =>{
 
     const res = await axios.get("https://pokeapi.co/api/v2/pokemon/"+pokeId())
    
       setWildPokemon(res.data);
}




const catchPokemon= (pokemon)=>{

setPokedex(prevState=>{
      const pokExists =  (prevState.filter(p=>pokemon.id == p.id).length > 0);

      if(!pokExists){
        prevState=[...prevState,pokemon];
        console.log(pokedex)
        prevState.sort(function(a,b){
          return a.id - b.id;
        })
      }
      else{
          return prevState;

      }

 }
)

 
 encounterWildPokemon()
}


const removePoke = (pokeId)=>{
       setPokedex(prevItems=> prevItems.filter(pokemon=>pokemon.id!==pokeId.id));
}


  return (
    <div className="app-wrapper">
        <header>
             <h1 className="title">Poke catcher</h1>
             <h3 className="subtitle">With pokemon</h3>
        </header>
        <section className="wild-pokemon">
              <h2>Wild Encounter</h2>
              <img src={"https://pokeres.bastionbot.org/images/pokemon/"+ wildPokemon.id + ".png"} alt="Move to next"  className="sprite" />
              <h3>{wildPokemon.name}</h3>
              <button onClick={()=>catchPokemon({wildPokemon})} className="catch-btn">catch</button>
        </section>

        <section className="pokedex">
           <h2>Pokedex</h2>
           <div className="pokedex-list">
              {pokedex && pokedex.map(pokemon=>(
                 <div className="pokemon" key={pokemon.id}> 
                      <img src={"https://pokeres.bastionbot.org/images/pokemon/"+pokemon.id+".png"}  className="sprite" />
                      <h3 className="pokemon-name">{pokemon.name}</h3>
                      <button className="remove" onClick={()=>removePoke({pokemon})}>&times;</button>
                 </div>
              ))}
           </div>
        </section>

    </div>
  );
}

export default App;


// https://pokeapi.co/api/v2/      //end point
// pokemon?limit=100&offset=200   // parametres, to get 100 pokemon with their url to get more info