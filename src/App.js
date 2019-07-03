import React, { useEffect, useState, Fragment } from 'react';
import './App.css';
import axios from 'axios';
import Loading from './components/Loading';

function App() {
  const [ character, setCharacter ] = useState({});
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    fetchCharacterInfo();
  }, []);

  const generateRandomCharacterId = (min, max) => {
    return parseInt(Math.random()*(max - min) + min);
  }

  const fetchCharacterInfo = async () => {
    const characterId = generateRandomCharacterId(1, 80);
    setLoading(true);
    try {
      const { data: { character, success } } = await axios({
        url: `/.netlify/functions/fetchStarWarsCharacterInfo`,
        method: 'GET',
        params: { characterId },
      });
      if(success) {
        setCharacter(character);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const displayableParams = {
    'name': 'Nome',
    'birth_year': 'Nascimento',
    'height': 'Altura',
    'hair_color': 'Cor do cabelo',
    'eye_color': 'Cor dos olhos',
    'mass': 'Massa',
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>
          Personagens de Star Wars
        </h3>
        <div className="board-container">
          {
            loading ? <Loading active={loading} width="w-4" width="h-4" /> :
            <div className="board">
              {
                Object.entries(character).filter(([param, ]) =>
                  Object.keys(displayableParams).includes(param)).map(([key, value]) =>
                    <Fragment key={key}>
                      <span className="board-title-cell">
                        { displayableParams[key] }:
                      </span>
                      <span>
                        { value }
                      </span>
                    </Fragment>
                  )
              }
            </div>
          }
        </div>
        <button onClick={fetchCharacterInfo} className="form-button">
          Procurar outro personagem
        </button>
      </header>
    </div>
  );
}

export default App;
