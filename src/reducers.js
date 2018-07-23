import keplerGlReducer from 'kepler.gl/reducers';

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {routerReducer} from 'react-router-redux';

// INITIAL_APP_STATE
const initialAppState = {
  appName: 'example',
  loaded: false
};

const reducers = combineReducers({
    // mount keplerGl reducer
    keplerGl: keplerGlReducer,
    app: handleActions({
        // empty
    }, initialAppState),
    routing: routerReducer
});

export default reducers;
