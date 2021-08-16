export const initialState = {
    dataTaxi: [],
    taxiCount: 0,
    timestamp: '',
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA_TAXI':
            return {
                ...state,
                dataTaxi: action.payload,
            }
        case 'SET_TAXI_COUNT':
            return {
                ...state,
                taxiCount: action.payload,
            }
        case 'SET_TIMESTAMP':
            return {
                ...state,
                timestamp: action.payload,
            }
        default:
            break;
    }
}

export default reducer;