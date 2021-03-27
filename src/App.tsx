import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from './app/store';
import { fetchCharacters } from './app/characters/characktersActions';
import { CharactersList } from './app/characters/CharactersList';
import { API_URL } from './constants/constants';

function App() {
  const dispatch = useDispatch();
  const charactersState = useSelector( (state: RootStore) => state.characters);
  const [isFetchAllCharackters, setIsFetchAllCharackters] = useState(false);
  const [charactersShow, setCharactersShow] = useState(charactersState.characters.slice(0, 10))
  const [charactersLength] = useState(charactersState.characters.length);

  useEffect(() => {
    dispatch(fetchCharacters(`${API_URL}/people`));
  }, [dispatch])

  useEffect(() => {
    setCharactersShow(charactersState.characters.slice(0, 10));
  }, [charactersState.characters])

  const handleButton = () => {
    const charactersShowLength = charactersShow.length;
    let newIndex = charactersShowLength + 5;
    if (newIndex >= charactersLength) {
      newIndex = charactersLength;
      setIsFetchAllCharackters(true);
    }

    setCharactersShow([...charactersShow, ...charactersState.characters.slice(charactersShowLength, newIndex)])
  }
  
  return (
    <div className="App">

      <main>
        {charactersState.loading ? (
          <div>Ładuje</div>
        ) : (
          charactersState.characters && (<CharactersList charactersList={charactersShow} />)
        )}
        { !isFetchAllCharackters ? (
        <button onClick={handleButton}>Załaduj więcej</button>
        ) : (
          <div>załadowano wsyzstko</div>
        )
        }
      </main>
    </div>
  );
}

export default App;
