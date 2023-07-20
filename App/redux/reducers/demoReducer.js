const initData = {
    comments: [],
    isLoading: false,
}

export default demoReducer = (state = initData, { type, payload }) => {
    switch (type) {
        case 'GET_COMMENTS':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_COMMENTS_SUCCESS':
            return {
                ...state,
                comments: payload,
                isLoading: false,
            }
        default:
            return state;
    }
}