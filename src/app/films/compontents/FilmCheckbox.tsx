import React from 'react';
import { FilmsCheckboxes } from './FilmsFilter';
import '../styles/filmsCheckbox.scss';

interface FilmCheckboxProps {
  film: FilmsCheckboxes,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FilmCheckbox: React.FC<FilmCheckboxProps> = ({film, onChange}) => {

  return (
    <label>
      <input 
        type="checkbox"
        value={film.title}
        name="title"
        checked={film.isChecked}
        onChange={onChange}
      /> <span>{film.title}</span>
    </label>
  )
} 