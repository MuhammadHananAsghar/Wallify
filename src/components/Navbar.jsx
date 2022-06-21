import React from 'react';
import { FcMenu } from 'react-icons/fc';
import '../styles/Navbar.css';
import { useNav } from "../contexts/NavbarContext";

export const Navbar = () => {
    const { dvalue, setDValue } = useNav();

    function handleSideBar(){
        if(dvalue.display === "block"){
            setDValue({display: "none"})
        }else{
            setDValue({display: "block"})
        }
    }

    return (
        <div className='navbar'>
            <FcMenu className='icon' onClick={handleSideBar} />
            <img src='https://via.placeholder.com/35' alt="User" className='userImage'/>
        </div>
    );
}