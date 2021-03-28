import React, {useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from './app/store';
import { fetchCharacters } from './app/characters/characktersActions';
import { CharactersList } from './app/characters/compontents/CharactersList';
import { FilmsCheckboxes, FilmsFilter } from './app/films/compontents/FilmsFilter';
import { fetchFilms } from './app/films/filmsAction';
import { API_URL } from './constants/constants';
import Logo from './media/logo.png';
import FilterIcon from './media/filter-icon.png';
import './styles/app.scss';

import { CharactersInformation } from './app/characters/characterActionTypes';

function App() {
  const dispatch = useDispatch();
  const charactersState = useSelector( (state: RootStore) => state.characters);
  const filmsState = useSelector( (state: RootStore) => state.films);
  const [isFetchAllCharacters, setIsFetchAllCharacters] = useState(false);
  const [characters, setCharacters] = useState<CharactersInformation[]>(charactersState.characters);
  const [charactersShow, setCharactersShow] = useState<CharactersInformation[]>(charactersState.characters.slice(0, 10));
  const [charactersShowLength, setCharactersShowLength] = useState<number>(charactersShow.length);
  const [charactersLength, setCharactersLength] = useState<number>(charactersState.characters.length);
  const [searchCharacter, setSearchCharacter] = useState('');
  const [isFilmsFilterShow, setIsFilmsFilterShow] = useState(false);
  const prevNewIndex = useRef(0);

  useEffect(() => {
    dispatch(fetchCharacters(`${API_URL}/people`));
    dispatch(fetchFilms(`${API_URL}/films`));
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    }
  }, [dispatch])

  useEffect(() => {
    setCharacters(charactersState.characters);
    setCharactersShow(charactersState.characters.slice(0, 10));
    setCharactersLength(charactersState.characters.length)
  }, [charactersState])

  useEffect(() => {
    checkIsFetchAllCharacters();
    setCharactersShowLength(charactersShow.length);
  }, [charactersShow])

  const updateCharactersShow = (index: number) => {
    setCharactersShow([...charactersShow, ...characters.slice(charactersShowLength, index)])
  }
  
  
  const infiniteScroll = () => {
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isFetchAllCharacters) {
      let newIndex = charactersShowLength + 5;
      if (newIndex >= charactersLength) {
        newIndex = charactersLength;
      }
      
      updateCharactersShow(newIndex);
      prevNewIndex.current = newIndex;
    }
  }

  const handleButton = () => {
    let newIndex = charactersShowLength + 5;
    if (newIndex >= charactersLength) {
      newIndex = charactersLength;
    }
    
    setCharactersShow([...charactersShow, ...characters.slice(charactersShowLength, newIndex)])
  }
  
  const checkIsFetchAllCharacters = () => {
    setIsFetchAllCharacters(charactersShow.length === characters.length);
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
    <div className="app">
      <header>
        <img className="logo" src={Logo} alt="star wars" />
        <div className="filters-container">
          <input
            className="search-bar"
            placeholder="Type a letter..."
            value={searchCharacter}
            onChange={e => updateInput(e)}
          />
          <button 
            className="filter-button" 
            onClick={() => setIsFilmsFilterShow(!isFilmsFilterShow)} 
            disabled={filmsState.loading}
          >
            <img src={FilterIcon} alt="filter" />
          </button>
          {!filmsState.loading && <FilmsFilter filmsList={filmsState.films} isShow={isFilmsFilterShow} onChangeCheckbox={handleFilmsFilter}/>}
        </div>
      </header>
      <div className="r"></div>
      <main>
        {charactersState.loading ? (
          <div>Ładuje</div>
        ) : (
          <>
          {charactersState.characters && <CharactersList charactersList={charactersShow} />}
          { !isFetchAllCharacters && <button onClick={handleButton}>Załaduj więcej</button>}
          </>
        )}
      <div className="characters-length">{charactersShow.length}/{charactersLength}</div>
      <div className="r"></div>
      </main>
    </div>
  );
}

export default App;
