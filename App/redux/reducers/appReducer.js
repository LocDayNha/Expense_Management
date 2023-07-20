const initData = {
    darkMode: false,
    isLoading: false,
    nameUser :"Lucas"
}
export default appReducer = (state = initData, { type, payload }) => {
    console.log("REDUCER",type,payload);
    switch (type) {
        case 'CHANGE_APP_MODE':
            return {
                ...state,
                isLoading: true,
            };
        case 'CHANGE_APP_MODE_SUCCESS':
            return {
                ...state,
                isLoading: false,
                darkMode: payload.darkMode,
            }
        default:
            return state;
    }
};