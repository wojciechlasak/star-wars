import React, { useEffect, useState } from 'react';
import { CharactersInformation } from '../characters/characterActionTypes';
import { FilmsCheckboxes, FilmsFilter } from '../films/compontents/FilmsFilter';
import { FilmsInformation } from '../films/filmsActionTypes';
import FilterIcon from '../../media/filter-icon.png';
import './styles/filters.scss';

interface FiltersProps {
  films: FilmsInformation[],
  characters: CharactersInformation[],
  filmsLoading: boolean,
  charactersLoading: boolean,
  onChangeFilter: (charactersFiltered: CharactersInformation[]) => void
}

export const Filters: React.FC<FiltersProps> = ({films, characters, filmsLoading, charactersLoading, onChangeFilter}) => {
  const [searchCharacter, setSearchCharacter] = useState<string>('');
  const [filmsToFiltered, setFilmsToFiltered] = useState<string[]>(films.map(film => film.title));
  const [isFilmsFilterShow, setIsFilmsFilterShow] = useState<boolean>(false);

  useEffect(() => {
    setFilmsToFiltered(films.map(film => film.title))
  }, [films])

  useEffect(() => {
    let filteredCharacters = characters.filter(character => (
      character.name.toLowerCase().includes(searchCharacter.toLowerCase())
    ))
    filteredCharacters = filteredCharacters.filter(character => {
      let characterFilms = character.films.map(film => {
        const index = Number(film.replace(/\D/g, ''));
        return films[index - 1];
        });
        characterFilms = characterFilms.filter(film => filmsToFiltered.includes(film.title));
        return characterFilms.length !== 0
      });

    onChangeFilter(filteredCharacters);

  }, [searchCharacter, filmsToFiltered, films, characters, onChangeFilter])

  const updateInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchCharacter(value);
  }

  const handleFilmsFilter = (filmsFilter: FilmsCheckboxes[]) => {
    const filmsChecked = filmsFilter.filter(film => film.isChecked);
    const filmsTitles = filmsChecked.map(film => film.title);
    setFilmsToFiltered(filmsTitles);
  }
  return (
    <div className="filters-container">
    <input
      className="search-bar"
      placeholder="Type a letter..."
      value={searchCharacter}
      onChange={e => updateInput(e)}
      disabled={charactersLoading}
    />
    <button
      className="filter-button"
      onClick={() => setIsFilmsFilterShow(!isFilmsFilterShow)}
      disabled={filmsLoading}
    >
      <img src={FilterIcon} alt="filter" />
    </button>
    {!filmsLoading && <FilmsFilter filmsList={films} isShow={isFilmsFilterShow} onChangeCheckbox={handleFilmsFilter} />}
  </div>
  );
}