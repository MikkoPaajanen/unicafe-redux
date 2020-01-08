import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import NotificationReducer from './reducers/NotificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdotes'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: NotificationReducer,
  filter: filterReducer
})
const store = createStore(reducer)

anecdoteService.getAll().then(anecdotes =>
    store.dispatch(initializeAnecdotes(anecdotes)))

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)