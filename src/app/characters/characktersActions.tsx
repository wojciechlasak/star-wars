import { Dispatch } from 'redux';
import { CharactersDispatchTypes, CHARACTERS_SUCCESS, CHARACTERS_LOADING, CHARACTERS_FAIL } from './characterActionTypes';
import { API_URL } from '../../constants/constants';

export const SET_CHARACTERS = 'SET_CHARACTERS';

export type ActionSetCharacters = {
  type: "SET_CHARACTERS",
  payload: []
}

export const setCharacters = (characters: []):ActionSetCharacters => ({
  type: SET_CHARACTERS,
  payload: characters
})

export const getCharacters = () => async (dispatch: Dispatch<CharactersDispatchTypes>) => {
  try {
    dispatch({
      type: CHARACTERS_LOADING
    })

    const res = await fetch(`${API_URL}/people`).then(res => res.json());

    dispatch({
      type: CHARACTERS_SUCCESS,
      payload: {
        information: res.results
      }
    })

  } catch(e) {
    dispatch({
      type: CHARACTERS_FAIL
    })
  }
}