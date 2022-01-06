export const filterChange = filter => {
    return {
        type: 'SET_FILTER',
        filter,
    }
}
const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.filter
        case 'CLEAR_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export default filterReducer 