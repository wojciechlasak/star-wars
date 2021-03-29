import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store/store';
import { CharactersInformation } from '../characterActionTypes';
import { CharacterImage } from './CharacterImage';
import BirthIcon from '../../../media/birth.png';
import Mass from '../../../media/mass.png';
import Height from '../../../media/height.png';
import '../styles/character.scss';

interface CharacterProps {
  character: CharactersInformation;
}

export const Character: React.FC<CharacterProps> = ({ character }) => {
  const filmsState = useSelector((state: RootStore) => state.films);
  const [shouldShowMore, setShouldShowMore] = useState<boolean>(false);
  return (
    <div
      className="character-single"
    >
      <div
        className="character-single-in"
        onClick={() => setShouldShowMore(!shouldShowMore)}
        style={{
          width: shouldShowMore ? '100%' : '50%'
        }}
      >
        <div
          className="character-single-in-basic"
          style={{
            width: shouldShowMore ? '50%' : '100%'
          }}
        >
          <div>
            <CharacterImage gender={character.gender} />
            <div className="name uppercase">{character.name}</div>
            <div><img src={BirthIcon} className="icon" alt="birth" /> {character.birth_year}</div>
            <div className="pale uppercase">{character.gender}</div>
          </div>
        </div>
        <div
          className="character-single-in-more"
          style={{
          }}
        >
          <ul>
            <div className="uppercase name">Films:</div>
            {!filmsState.loading && character.films.map(film => {
              const index = Number(film.replace(/\D/g, ''));
              return <li key={index}>{filmsState.films[index - 1].title}</li>
            })}
          </ul>
          <div><img src={Height} className="icon" alt="height" />  {character.height}</div>
          <div><img src={Mass} className="icon" alt="mass" />  {character.mass}</div>
        </div>
      </div>
    </div>
  )
} 