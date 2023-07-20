import { createContext, useState, useMemo } from "react";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const { children } = props;
    const [isLogin, setIsLogin] = useState(false)
    const [infoUser, setInfoUser] = useState({})
    const [idUser, setIdUser] = useState("")
    const [appState, setAppState] = useState(0)

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    //Bé hơn 10 thì thêm số 0
    month = month < 10 ? `0${month}` : `${month}`;
    day = day < 10 ? `0${day}` : `${day}`;

    let currentDay = `${year}-${month}-${day}`
    // console.log("currentDay", currentDay);
    const contextValue = useMemo(() => {
        return { isLogin, setIsLogin, infoUser, setInfoUser, idUser, setIdUser,
             currentDay, appState, setAppState };
    }, [isLogin, setIsLogin, infoUser, setInfoUser, idUser, setIdUser, 
        currentDay, appState, setAppState]);

    return (
        <AppContext.Provider
            value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}