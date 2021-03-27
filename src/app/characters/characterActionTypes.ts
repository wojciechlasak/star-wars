export const CHARACTERS_LOADING = 'CHARACTERS_LOADING';
export const CHARACTERS_FAIL = 'CHARACTERS_FAIL';
export const CHARACTERS_SUCCESS = 'CHARACTERS_SUCCESS';

export type CharactersInformation = {
  name: string,
  gender: string,
  birth_year: string,
  height: string,
  film: string[],
}

export interface CharactersLoading {
  type: typeof CHARACTERS_LOADING;
}

export interface CharactersFail {
  type: typeof CHARACTERS_FAIL;
}

export interface CharactersSuccess {
  type: typeof CHARACTERS_SUCCESS,
  payload: CharactersInformation[],
}

export type CharactersDispatchTypes = CharactersLoading | CharactersFail | CharactersSuccess;