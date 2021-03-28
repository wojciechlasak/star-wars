import React, { useState, useEffect } from 'react';
import '../styles/character.scss';
import Female from '../../../media/female.png';
import Male from '../../../media/male.png';
import Undefined from '../../../media/undefined.png';
import Na from '../../../media/na.png';

interface CharacterImageProps {
  gender: string
}

export const CharacterImage: React.FC<CharacterImageProps> = ({gender}) => {
  const [icon, setIcon] = useState('')

  useEffect(() => {
    switch (gender) {
      case 'female':
        setIcon(Female);
        break;
      case 'male':
        setIcon(Male);
        break;
      case 'undefined':
        setIcon(Undefined);
        break;
      case 'n/a':
        setIcon(Na);
        break;
      default:
        setIcon(Undefined);
        break;
    }
  }, [gender])

  return (
    <img className="character-image" src={icon} alt={gender} />
  )
} 