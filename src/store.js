import { createStore, compose } from 'redux'
import rootReducer from './reducer'
import firebaseApp from './config'
import { reactReduxFirebase } from 'react-redux-firebase'


export default function configureStore (initialState, history) {
  const createStoreWithMiddleware = compose(
    reactReduxFirebase(firebaseApp, {
        userProfile: 'users',
        enableLogging: false
      }
    ),
  )(createStore)

  const store = createStoreWithMiddleware(rootReducer)

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./reducer', () => {
  //     const nextRootReducer = require('./reducer')
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store
}
