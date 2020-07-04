const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CAND_DETAILS':
            return {
                ...state,
                ...{candidateDetails: action.payload}
            };
        case 'REMOVE_CAND_DETAILS':
            return {
                ...state,
                ...{candidateDetails: null}
            };
        default:
            return state;
    }
};
export default Reducer;
