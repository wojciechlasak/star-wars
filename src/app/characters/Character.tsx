import React from 'react';
import { CharactersInformation } from './characterActionTypes';

interface CharacterProps {
  character: CharactersInformation;
}

export const Character: React.FC<CharacterProps> = ({character}) => {
  return (
    <div>
      {character.name}
    </div>
  )
} 