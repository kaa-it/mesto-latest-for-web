import {combineReducers} from 'redux';

import {name as currentUserStoreName} from './current-user/constants';
import currentUser from './current-user/reducer';
import {name as cardsStoreName} from './cards/actions';
import cards from './cards/reducer';
import {name as authStoreName} from './auth/constants';
import auth from './auth/reducer';

export default combineReducers({
  [currentUserStoreName]: currentUser,
  [cardsStoreName]: cards,
  [authStoreName]: auth,
});