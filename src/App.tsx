import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from './app/store/store';
import { fetchCharacters } from './app/characters/characktersActions';
import { fetchFilms } from './app/films/filmsAction';
import { CharactersList } from './app/characters/compontents/CharactersList';
import { CharactersInformation } from './app/characters/characterActionTypes';
import { Filters } from './app/filters/Filters';
import { API_URL, DATA_AMOUNT_FIRST_LOAD, DATA_AMOUNT_LOAD } from './constants/constants';
import Logo from './media/logo.png';
import Sword from './media/sword.png';
import './styles/app.scss';


const App: React.FC = () => {
  const dispatch = useDispatch();
  const charactersState = useSelector((state: RootStore) => state.characters);
  const filmsState = useSelector((state: RootStore) => state.films);
  const [isFetchAllCharacters, setIsFetchAllCharacters] = useState<boolean>(false);
  const [characters, setCharacters] = useState<CharactersInformation[]>(charactersState.characters);
  const [charactersShow, setCharactersShow] = useState<CharactersInformation[]>(charactersState.characters.slice(0, DATA_AMOUNT_FIRST_LOAD));


  const infiniteScroll = useCallback(() => {
    if (Math.ceil(window.innerHeight + window.scrollY)+2 >= document.body.offsetHeight && !isFetchAllCharacters) {
      let newIndex = charactersShow.length + DATA_AMOUNT_LOAD;
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
    setCharactersShow(charactersState.characters.slice(0, DATA_AMOUNT_FIRST_LOAD));
  }, [charactersState])

  useEffect(() => {
    checkIsFetchAllCharacters();
  }, [charactersShow, checkIsFetchAllCharacters])

  const handleOnChangeFilter = useCallback((charactersFiltered: CharactersInformation[]) => {
    setCharacters(charactersFiltered)
    setCharactersShow(charactersFiltered.slice(0, DATA_AMOUNT_FIRST_LOAD));
  }, [])

  return (
    <div className="app">
      <header>
        <img className="logo" src={Logo} alt="star wars" />
        <Filters
          films={filmsState.films}
          characters={charactersState.characters}
          filmsLoading={filmsState.loading}
          charactersLoading={charactersState.loading}
          onChangeFilter={handleOnChangeFilter}
        />
      </header>
      <div className="r"></div>
      <main>
        {(charactersState.loading || filmsState.loading) ? (
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
