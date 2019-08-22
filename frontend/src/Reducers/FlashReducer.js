import {combineReducers} from 'redux';

import messageReducer from '../Components/FlashReducerMessage/FlashReducerMessage';

const rootReducer = combineReducers({  
  flashMessage: messageReducer
});

export default rootReducer;  