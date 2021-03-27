import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from './app/store';
import { getCharacters } from './app/characters/characktersActions';
import { CharactersList } from './app/characters/CharactersList';

function App() {
  const dispatch = useDispatch();
  const charactersState = useSelector( (state: RootStore) => state.characters);

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch])


  return (
    <div className="App">

      <main>
        {charactersState.loading ? (
          <div>Ładuje</div>
        ) : (
          charactersState.characters && <CharactersList charactersList={charactersState.characters.information} />
        )}
      </main>
    </div>
  );
}

export default App;
