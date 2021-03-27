import React, { useState } from 'react';
import { CharactersInformation } from './characterActionTypes';

interface CharacterProps {
  character: CharactersInformation;
}

export const Character: React.FC<CharacterProps> = ({character}) => {
  const [shouldShowMore, setShouldShowMore] = useState(false);
  return (
    <div>
      <ul>
        <li>{character.name}</li>
        <li>{character.gender}</li>
        <li>{character.birth_year}</li>
        {shouldShowMore && (
          <li>{character.height}</li>
        )}
      </ul>
      <button onClick={() => setShouldShowMore(!shouldShowMore)}>
        Pokaż {shouldShowMore ? 'mniej' : 'więcej'} info
        </button>
    </div>
  )
} 