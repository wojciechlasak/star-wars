import React from 'react';
import { Character } from './Character';
import { CharactersInformation } from '../characterActionTypes';
import '../styles/charactersList.scss';

interface CharactersListProps {
  charactersList: CharactersInformation[] 
}

export const CharactersList: React.FC<CharactersListProps> = ({charactersList}) => {

  return (
    <div className="characters-list-container">
      {charactersList.map((character) => (
        <Character key={character.name} character={character} />
      ))}
    </div>
  )
} 