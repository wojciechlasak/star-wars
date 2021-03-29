import React, { useState, useEffect } from 'react';
import Female from '../../../media/female.png';
import Male from '../../../media/male.png';
import None from '../../../media/undefined.png';
import Na from '../../../media/na.png';
import '../styles/character.scss';

interface CharacterImageProps {
  gender: string
}

export const CharacterImage: React.FC<CharacterImageProps> = ({gender}) => {
  const [icon, setIcon] = useState<string>('')

  useEffect(() => {
    switch (gender) {
      case 'female':
        setIcon(Female);
        break;
      case 'male':
        setIcon(Male);
        break;
      case 'none':
        setIcon(None);
        break;
      case 'n/a':
        setIcon(Na);
        break;
      default:
        setIcon(None);
        break;
    }
  }, [gender])

  return (
    <img className="character-image" src={icon} alt={gender} />
  )
} 