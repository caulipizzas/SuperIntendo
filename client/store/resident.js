import axios from 'axios'
import history from '../history'
import {me} from './user'

/**
 * ACTION TYPES
 */
const GOT_BUILDINGS = 'GOT_BUILDINGS'
const GOT_SELF = 'GOT_SELF'
const GOT_TICKETS = 'GOT_TICKETS'
const CREATE_TICKET = 'CREATE_TICKET'
const GOT_NEWS = 'GOT_NEWS'
const CREATE_NEWS = 'CREATE_NEWS'
/**
 * INITIAL STATE
 */
const defaultResident = {
  buildings: [],
  self: {},
  tickets: [],
  news: []
}

/**
 * ACTION CREATORS
 */
const gotBuildings = buildings => ({type: GOT_BUILDINGS, buildings})
const gotSelf = self => ({type: GOT_SELF, self})
const gotTickets = tickets => ({type: GOT_TICKETS, tickets})
const createTicket = ticket => ({type: CREATE_TICKET, ticket})
const gotNews = news => ({type: GOT_NEWS, news})
const createNews = news => ({type: CREATE_NEWS, news})
/**
 * THUNK CREATORS
 */
export const getBuildings = () => async dispatch => {
  try {
    const res = await axios.get('/api/buildings')
    dispatch(gotBuildings(res.data || {}))
  } catch (err) {
    console.error(err)
  }
}

export const getTickets = () => async dispatch => {
  try {
    const res = await axios.get('/api/resident/tickets')
    dispatch(gotTickets(res.data || []))
  } catch (err) {
    console.error(err)
  }
}

export const createTicketThunk = ticket => async dispatch => {
  try {
    const {data} = await axios.post('/api/resident/tickets', ticket)
    dispatch(createTicket(data || {}))
    history.push('/tickets')
  } catch (err) {
    console.error(err)
  }
}

export const getNewsThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/resident/news')
    dispatch(gotNews(res.data || []))
  } catch (err) {
    console.error(err)
  }
}

export const createNewsThunk = news => async dispatch => {
  try {
    const {data} = await axios.post('/api/resident/news', news)
    dispatch(createNews(data || {}))
    history.push('/news')
  } catch (err) {
    console.error(err)
  }
}

export const createResident = data => async dispatch => {
  try {
    const res = await axios.post('/api/resident', data)
    dispatch(gotSelf(res.data || {}))
    dispatch(me())
    history.push('/home')
  } catch (err) {
    console.error(err)
  }
}

export const getSelf = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/resident')
    dispatch(gotSelf(data || {}))
  } catch (err) {
    console.error(err)
  }
}

export const updateProfile = updatedSelf => async dispatch => {
  try {
    await axios.put('/api/resident', updatedSelf)
    dispatch(getSelf())
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultResident, action) {
  switch (action.type) {
    case GOT_BUILDINGS:
      return {...state, buildings: action.buildings}
    case GOT_SELF:
      return {...state, self: action.self}
    case GOT_TICKETS:
      return {...state, tickets: action.tickets}
    case GOT_NEWS:
      return {...state, news: action.news}
    case CREATE_TICKET:
      return {...state, tickets: [action.ticket, ...state.tickets]}
    default:
      return state
  }
}
