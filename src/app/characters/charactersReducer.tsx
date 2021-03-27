import { CharactersType, CharactersDispatchTypes, CHARACTERS_SUCCESS, CHARACTERS_LOADING, CHARACTERS_FAIL } from './characterActionTypes';

export interface DefaultStateI {
  loading: boolean,
  characters?: CharactersType
}

const defaultState: DefaultStateI = {
  loading: false,
}

export const characterReducer = (state:DefaultStateI = defaultState, action: CharactersDispatchTypes):DefaultStateI => {
  switch(action.type) {
    case CHARACTERS_FAIL:
      return {
        loading: false,
      }
    case CHARACTERS_LOADING: 
      return {
        loading: true,
      }
    case CHARACTERS_SUCCESS:
      return {
        loading: false,
        characters: action.payload
      }
    default:
      return state;
  }
}

