import {combineReducers} from "redux";
import { characterReducer } from "./characters/charactersReducer";

const RootReducer = combineReducers({
  characters: characterReducer
});

export default RootReducer