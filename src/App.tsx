import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from './app/store';
import { fetchCharacters } from './app/characters/characktersActions';
import { CharactersList } from './app/characters/compontents/CharactersList';
import { FilmsCheckboxes, FilmsFilter } from './app/films/compontents/FilmsFilter';
import { fetchFilms } from './app/films/filmsAction';
import { API_URL } from './constants/constants';

function App() {
  const dispatch = useDispatch();
  const charactersState = useSelector( (state: RootStore) => state.characters);
  const filmsState = useSelector( (state: RootStore) => state.films);
  const [isFetchAllCharackters, setIsFetchAllCharackters] = useState(false);
  const [characters, setCharacters] = useState(charactersState.characters);
  const [charactersShow, setCharactersShow] = useState(charactersState.characters.slice(0, 10))
  const [charactersLength, setCharactersLength] = useState(charactersState.characters.length);
  const [searchCharacter, setSearchCharacter] = useState('');
  const [isFilmsFilterShow, setIsFilmsFilterShow] = useState(false);

  useEffect(() => {
    dispatch(fetchCharacters(`${API_URL}/people`));
    dispatch(fetchFilms(`${API_URL}/films`));
  }, [dispatch])

  useEffect(() => {
    setCharacters(charactersState.characters);
    setCharactersShow(charactersState.characters.slice(0, 10));
    setCharactersLength(charactersState.characters.length)
  }, [charactersState.characters])

  useEffect(() => {
    checkIsFetchAllCharacters();
  }, [charactersShow])
  
  const checkIsFetchAllCharacters = () => {
    const charactersShowLength = charactersShow.length;
    const newIndex = charactersShowLength + 5;

    if (newIndex >= charactersLength) {
      setIsFetchAllCharackters(true);
    } else {
      setIsFetchAllCharackters(false);
    }
  }

  const handleButton = () => {
    const charactersShowLength = charactersShow.length;
    let newIndex = charactersShowLength + 5;
    if (newIndex >= charactersLength) {
      newIndex = charactersLength;
      setIsFetchAllCharackters(true);
    }
    
    setCharactersShow([...charactersShow, ...characters.slice(charactersShowLength, newIndex)])
  }

  const updateInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const filtered = charactersState.characters.filter(character => (
      character.name.toLowerCase().includes(value.toLowerCase())
    ))
    setSearchCharacter(value);
    setCharacters(filtered);
    setCharactersLength(filtered.length)
    setCharactersShow(filtered.slice(0, 10));
    checkIsFetchAllCharacters();
 }

 const handleFilmsFilter = (films: FilmsCheckboxes[]) => {
  const filmsChecked = films.filter(film => film.isChecked);
  const filmsTitles = filmsChecked.map(film => film.title);

  const filtered = charactersState.characters.filter(character => {
    let characterFilms = character.films.map(film => {
      const index = Number(film.replace( /\D/g, ''));
      return filmsState.films[index-1];
    });
    characterFilms = characterFilms.filter(film => filmsTitles.includes(film.title));
    return characterFilms.length !== 0
  });

  setCharacters(filtered);
  setCharactersLength(filtered.length)
  setCharactersShow(filtered.slice(0, 10));
  checkIsFetchAllCharacters();
 }
  
  return (
    <div className="App">
      <input
        placeholder="szukaj ludziów"
        value={searchCharacter}
        onChange={e => updateInput(e)}
      />
      <button onClick={() => setIsFilmsFilterShow(!isFilmsFilterShow)} disabled={filmsState.loading}>filters</button>
      {!filmsState.loading && <FilmsFilter filmsList={filmsState.films} isShow={isFilmsFilterShow} onChangeCheckbox={handleFilmsFilter}/>}
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
