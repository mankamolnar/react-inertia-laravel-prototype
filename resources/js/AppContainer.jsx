import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, toggleLocale } from "./store/themeConfigSlice";

import store from "./store";

function AppContainer({ children }) {
    const themeConfig = useSelector(state => state.themeConfig);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem("theme") || themeConfig.theme));
        dispatch(toggleLocale(localStorage.getItem("i18nextLng") || themeConfig.locale));
    }, [
        dispatch,
        themeConfig.theme,
        themeConfig.locale,
    ])

    return (
        <div className={`${(store.getState().themeConfig.sidebar && "toggle-sidebar") || ""} vertical full ltr main-section antialiased relative font-nunito text-sm font-normal`}>
            {children}
        </div>
    );
}

export default AppContainer;