import React, { useEffect, useState } from "react";
import axios from "axios";
import  './index.css'
import spinner from './spinner.gif';
function App() {
  const [pokedex, setPokedex] = useState([]);
  const [wildPokemon, setWildPokemon] = useState({});
  const [loading,setLoading] = useState(false);
  const [Height,setHeight] = useState(false)
 

  useEffect(() => {
    encounterWildPokemon();
  }, []);

  const pokeId = () => {
    const min = Math.ceil(1);
    const max = Math.floor(1151);
     let pokeId = Math.floor(Math.random() * (max - min + 1)) + min;
     console.log(pokeId,'beforeCheck');
     if(checkForDuplicates(pokeId))
      pokeId = pokeId();
     console.log(pokeId,'AfterCheck');
     return pokeId;
  };
  const encounterWildPokemon = async () => {
  
    try {
      setLoading(true)
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/" +pokeId() )
        setLoading(false)
        setWildPokemon(res.data)
          
    }

    catch(err){
             console.error(err.message);
             encounterWildPokemon()

    }
    
  
  

    // setPokedex((prevItems) =>{
    //      const exists = (prevItems.filter((poke,id)=>poke.id===res.data.id).length>0);
    //      if(!exists){
    //           return [...prevItems,res.data] 
    //      }
    //      else{
    //        encounterWildPokemon()
    //      }
    // });
  };
   
    const checkForDuplicates = (id) =>{

         if(pokedex.find(pokemon=> pokemon.id ===id)){
           return true;
         }
         else{
           return false;
         }
    }

     const encounterWildPokemonClick = ()=>{
      document.getElementById("catch-btn").disabled=true
         setPokedex(prevItems=>[wildPokemon,...prevItems]);
         encounterWildPokemon()
       setTimeout(()=>document.getElementById("catch-btn").disabled=false,750);
      


     }

  return (
    <div className="app-wrapper">
      <header>
        <h1 className="title text-center">Poke catcher</h1>
        <h3 className="subtitle text-center mt-3">With pokemon</h3>
      </header>
      <section className="wild-pokemon">
        <h2>Wild Encounter</h2>

        {/* {loading && <img src={spinner} className="sprite" />} */}
        <img
          src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
            wildPokemon.id +
            ".png"
          }
          alt="Move to next"
          onError={encounterWildPokemon}
          className="sprite"
        />
        <h3>{wildPokemon.name}</h3>
        <button className="catch-btn" id="catch-btn" onClick={()=>encounterWildPokemonClick()}>catch</button>
      </section>

      <section className="pokedex-section py-5">
        <div className="container">
          <div className="row">
            {pokedex.map((pokemon, id) => {
              console.log(pokedex);
              return (
                <div key={pokemon.id} className="col-11 my-3  col-sm-6 col-md-4 setMx">
                  <div className="card">
                    <div className="card-img-container text-center poke-card">
                      <img
                        src={
                          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                          pokemon.id +
                          ".png"
                        }
                        id={pokemon.id}
                        className=""
                        alt=""
                      />
                      <img
                        src={
                          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/" +
                          pokemon.id +
                          ".png"
                        }
                        className=""
                        id={pokemon.id}
                        onError={()=>{document.getElementById(pokemon.id).style.position='relative'
                                     document.getElementById(pokemon.id).style.top='0px'
                                     document.getElementById(pokemon.id).parentElement.style.height='128px'
                                     document.getElementById(pokemon.id+"w").style.position='absolute'
                                     document.getElementById(pokemon.id+"w").style.bottom='0'
                                     document.getElementById(pokemon.id+"w").style.left='4%'
                                     document.getElementById(pokemon.id+"a").classList.toggle('fix-alignement')
                                     }
                                 }
                        alt=""
                      />
                      <div className="poke-info d-flex justify-content-around" id={pokemon.id+"w"}>
                        <h5 className="poke-name font-italic" id={pokemon.id+"a"}>
                          Name: {pokemon.name}
                        </h5>
                        <h5 className="font-italic"> Type: {pokemon.types[0].type.name}</h5>
                          
                        
                      </div>
                    </div>
                    <div className="card-body pt-3">
                      <h4 className="card-title text-center font-italic stats">
                        Stats
                      </h4>
                      <div className="mx-auto underline"></div>
                      <div className="card-text">
                           {/* single stat */ }
                                <div className="my-3 d-flex justify-content-between">
                                    <h5 className="font-italic text-capitalize">hp</h5>
                                    <h5 className="font-italic text-capitalize">{pokemon.stats[0].base_stat}%</h5>
                                </div>

                                <div className="progress bg-secondary">
                                    <div className="progress-bar hp-bar" style={{width:`${pokemon.stats[0].base_stat}%`}}></div>
                                </div>
                           {/* end of single stat */}

                           {/* single stat */ }
                           <div className="my-3 d-flex justify-content-between">
                                    <h5 className="font-italic text-capitalize">attack</h5>
                                    <h5 className="font-italic text-capitalize">{pokemon.stats[1].base_stat}%</h5>
                                </div>

                                <div className="progress bg-secondary">
                                    <div className="progress-bar attack-bar " style={{width:`${pokemon.stats[1].base_stat}%`}}></div>
                                </div>
                           {/* end of single stat */}

                           {/* single stat */ }
                           <div className="my-3 d-flex justify-content-between">
                                    <h5 className="font-italic text-capitalize">defense</h5>
                                    <h5 className="font-italic text-capitalize">{pokemon.stats[2].base_stat}%</h5>
                                </div>

                                <div className="progress bg-secondary">
                                    <div className="progress-bar defense-bar " style={{width:`${pokemon.stats[2].base_stat}%`}}></div>
                                </div>
                           {/* end of single stat */}

                           {/* single stat */ }
                           <div className="my-3 d-flex justify-content-between">
                                    <h5 className="font-italic text-capitalize">special-attack</h5>
                                    <h5 className="font-italic text-capitalize">{pokemon.stats[3].base_stat}%</h5>
                                </div>

                                <div className="progress bg-secondary">
                                    <div className="progress-bar special-attack-bar " style={{width:`${pokemon.stats[3].base_stat}%`}}></div>
                                </div>
                           {/* end of single stat */}

                           {/* single stat */ }
                           <div className="my-3 d-flex justify-content-between">
                                    <h5 className="font-italic text-capitalize">special-defense</h5>
                                    <h5 className="font-italic text-capitalize">{pokemon.stats[4].base_stat}%</h5>
                                </div>

                                <div className="progress bg-secondary">
                                    <div className="progress-bar special-defense-bar " style={{width:`${pokemon.stats[4].base_stat}%`}}></div>
                                </div>
                           {/* end of single stat */}

                           {/* single stat */ }
                           <div className="my-3 d-flex justify-content-between">
                                    <h5 className="font-italic text-capitalize">speed</h5>
                                    <h5 className="font-italic text-capitalize">{pokemon.stats[5].base_stat}%</h5>
                                </div>

                                <div className="progress bg-secondary">
                                    <div className="progress-bar speed-bar " style={{width:`${pokemon.stats[5].base_stat}%`}}></div>
                                </div>
                           {/* end of single stat */}


                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

// https://pokeapi.co/api/v2/      //end point
// pokemon?limit=100&offset=200   // parametres, to get 100 pokemon with their url to get more info

