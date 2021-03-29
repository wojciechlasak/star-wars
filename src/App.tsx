import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from './app/store';
import { fetchCharacters } from './app/characters/characktersActions';
import { CharactersList } from './app/characters/compontents/CharactersList';
import { CharactersInformation } from './app/characters/characterActionTypes';
import { FilmsCheckboxes, FilmsFilter } from './app/films/compontents/FilmsFilter';
import { fetchFilms } from './app/films/filmsAction';
import { API_URL } from './constants/constants';
import Logo from './media/logo.png';
import FilterIcon from './media/filter-icon.png';
import Sword from './media/sword.png';
import './styles/app.scss';


function App() {
  const dispatch = useDispatch();
  const charactersState = useSelector((state: RootStore) => state.characters);
  const filmsState = useSelector((state: RootStore) => state.films);
  const [isFetchAllCharacters, setIsFetchAllCharacters] = useState<boolean>(false);
  const [characters, setCharacters] = useState<CharactersInformation[]>(charactersState.characters);
  const [charactersShow, setCharactersShow] = useState<CharactersInformation[]>(charactersState.characters.slice(0, 10));
  const [searchCharacter, setSearchCharacter] = useState<string>('');
  const [isFilmsFilterShow, setIsFilmsFilterShow] = useState<boolean>(false);


  const infiniteScroll = useCallback(() => {
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isFetchAllCharacters) {
      let newIndex = charactersShow.length + 5;
      if (newIndex >= characters.length) {
        newIndex = characters.length;
        setIsFetchAllCharacters(true)
      }

      setCharactersShow([...charactersShow, ...characters.slice(charactersShow.length, newIndex)])
    }
  }, [characters, charactersShow, isFetchAllCharacters])

  const checkIsFetchAllCharacters = useCallback(() => {
    setIsFetchAllCharacters(charactersShow.length === characters.length);
  }, [characters, charactersShow])

  useEffect(() => {
    dispatch(fetchCharacters(`${API_URL}/people`));
    dispatch(fetchFilms(`${API_URL}/films`));
  }, [dispatch])

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    }
  }, [charactersShow, isFetchAllCharacters, infiniteScroll])

  useEffect(() => {
    setCharacters(charactersState.characters);
    setCharactersShow(charactersState.characters.slice(0, 10));
  }, [charactersState])

  useEffect(() => {
    checkIsFetchAllCharacters();
  }, [charactersShow, checkIsFetchAllCharacters])

  const updateInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const filtered = charactersState.characters.filter(character => (
      character.name.toLowerCase().includes(value.toLowerCase())
    ))
    setSearchCharacter(value);
    setCharacters(filtered);
    setCharactersShow(filtered.slice(0, 10));
    checkIsFetchAllCharacters();
  }

  const handleFilmsFilter = (films: FilmsCheckboxes[]) => {
    const filmsChecked = films.filter(film => film.isChecked);
    const filmsTitles = filmsChecked.map(film => film.title);

    const filtered = charactersState.characters.filter(character => {
      let characterFilms = character.films.map(film => {
        const index = Number(film.replace(/\D/g, ''));
        return filmsState.films[index - 1];
      });
      characterFilms = characterFilms.filter(film => filmsTitles.includes(film.title));
      return characterFilms.length !== 0
    });

    setCharacters(filtered);
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
          {!filmsState.loading && <FilmsFilter filmsList={filmsState.films} isShow={isFilmsFilterShow} onChangeCheckbox={handleFilmsFilter} />}
        </div>
      </header>
      <div className="r"></div>
      <main>
        {charactersState.loading ? (
          <div className="loader"><img src={Sword} alt="sword" /></div>
        ) : (
            <>
              {charactersState.characters && <CharactersList charactersList={charactersShow} />}
              <div className="characters-length">{charactersShow.length}/{characters.length}</div>
            </>
          )}
        <div className="r"></div>
      </main>
    </div>
  );
}

export default App;
