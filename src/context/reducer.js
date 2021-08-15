export const initialState = {
    dataTaxi: [],
    infoTaxi: {},
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA_TAXI':
            return {
                ...state,
                dataTaxi: action.payload,
            }
        case 'SET_INFO_TAXI':
            return {
                ...state,
                infoTaxi: action.payload,
            }
        default:
            break;
    }
}

export default reducer;