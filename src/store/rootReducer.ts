import {combineReducers} from 'redux';

import authReducer from 'store/slices/auth';
import questionnaireReducer from 'store/slices/questionnaire';

const rootReducer = combineReducers({
  auth: authReducer,
  questionnaire: questionnaireReducer,
});

export type rootState = ReturnType<typeof rootReducer>;
export default rootReducer;
