import { createContext, useState, useContext } from "react";

const NavContext = createContext();

export const useNav = () => {
    return useContext(NavContext)
}

export const NavState = (props) => {
    const [dvalue, setDValue] = useState();

    // Get Width and Height
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
        width,
        height
        };
    }

    function setNav(){
        const dimensions = getWindowDimensions()
        if(dimensions.width < 600){
            setDValue({display: "none"})
        }else{
            setDValue({display: "block"})
        }
    }

    return (
        <NavContext.Provider value={{ dvalue, setNav, setDValue }}>
            { props.children }
        </NavContext.Provider>
    );
}