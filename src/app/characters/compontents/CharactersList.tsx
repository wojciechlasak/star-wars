import React from 'react';
import { Character } from './Character';
import { CharactersInformation } from '../characterActionTypes';

interface CharactersListProps {
  charactersList: CharactersInformation[] 
}

export const CharactersList: React.FC<CharactersListProps> = ({charactersList}) => {

  return (
    <div>
      {charactersList.map((character) => (
        <Character key={character.name} character={character} />
      ))}
    </div>
  )
} 