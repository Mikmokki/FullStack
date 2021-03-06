let clearingId = 0
export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}
export const setNotification = (notification, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: { notification }
        })
        clearTimeout(clearingId)
        clearingId = setTimeout(() => dispatch(clearNotification()), time * 1000)
    }
}
const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data.notification
        case 'CLEAR_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export default notificationReducer 