
import anecdoteService from "../services/anecdotes"

export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: {
        id: id
      }
    })
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote,
    })
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE_ANECDOTE':
      const actionId = action.data.id
      const data = state.find(anecdote => anecdote.id === actionId)
      const votedAnecdote = {
        ...data, votes: data.votes + 1
      }
      return state.map(anecdote => anecdote.id === actionId ? votedAnecdote : anecdote).sort((a, b) => b.votes - a.votes)
    case 'ADD_ANECDOTE':
      return state.concat(action.data).sort((a, b) => b.votes - a.votes)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer