const SEARCH = 'SEARCH'

export const search = (searchState) => {
  return { type: SEARCH, searchParams: searchState }
}

export default (state = {}, action) => {
  switch (action.type) {
    case SEARCH:
      return action.searchParams
    default:
      return state
  }
};