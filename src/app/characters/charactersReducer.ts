import {CharactersInformation, CharactersDispatchTypes, CHARACTERS_SUCCESS, CHARACTERS_LOADING, CHARACTERS_FAIL } from './characterActionTypes';

export interface DefaultStateI {
  loading: boolean,
  characters: CharactersInformation[]
}

const defaultState: DefaultStateI = {
  loading: false,
  characters: []
}

export const characterReducer = (state:DefaultStateI = defaultState, action: CharactersDispatchTypes):DefaultStateI => {
  switch(action.type) {
    case CHARACTERS_FAIL:
      return {
        loading: false,
        characters: [],
      }
    case CHARACTERS_LOADING: 
      return {
        loading: true,
        characters: [],
      }
    case CHARACTERS_SUCCESS:
      return {
        loading: false,
        characters: state.characters.concat(action.payload)
      }
    default:
      return state;
  }
}

