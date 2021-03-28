import React, { useState } from 'react';
import { FilmsInformation } from '../filmsActionTypes';
import { FilmCheckbox } from './FilmCheckbox';
import '../styles/filmsFilter.scss';

interface FilmsFilterProps {
  filmsList: FilmsInformation[],
  isShow: boolean,
  onChangeCheckbox: (films: FilmsCheckboxes[]) => void
}

export interface FilmsCheckboxes {
  id: number,
  isChecked: boolean,
  title: string,
}

export const FilmsFilter: React.FC<FilmsFilterProps> = ({filmsList, isShow, onChangeCheckbox}) => {
  const [isAll, setIsAll] = useState(true)
  const [films, setFilms] = useState(filmsList.map((film, index)  => (
    {
      id: index,
      isChecked: true,
      title: film.title,
    }
  )))

  const handleClickAll = () => {
    setFilms(films.map(film => {
      film.isChecked = !isAll;
      return film;
    }));
    setIsAll(!isAll);
    onChangeCheckbox(films);
  }

  const handeOnChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAll(false);
    setFilms(films.map(film => {
      if (e.target.value === film.title) 
        film.isChecked = e.target.checked;
      
      return film;
    }));
    onChangeCheckbox(films);
  }

  return (
    <>
    {isShow && (
    <div className="films-filter-container">
      <div onClick={handleClickAll}>{isAll ? 'Wyczyść' : "Zaznacz wszystkie"}</div>
      {films.map((film) => (
        <FilmCheckbox key={film.title} film={film} onChange={handeOnChangeCheckbox}/>
      ))}
    </div>
    )}
    </>
  )
} 