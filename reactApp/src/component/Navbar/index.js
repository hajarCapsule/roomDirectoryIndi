import React from 'react'
import {Nav,NavLink,Bars,NavMenu,NavBtn,NavBtnLink} from './NavbarElements'
import '../../App.css';


const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to ="/home">
                <img className = "logoSize" src="https://res.cloudinary.com/dgv5agwfj/image/upload/v1614590242/Hotel%20des%20Deux-%C3%8Eles%20%28Room%20Directory%29/LOGO_DEUX_ILES_RVB_hk4avh.png"/>
                </NavLink>
                <Bars/>

                <NavMenu>
                <NavLink to ="/home" activeStyle>
                MyHome
                </NavLink>
                <NavLink to ="/service" activeStyle>
                Services
                </NavLink>
                <NavLink to ="/contact-us" activeStyle>
                    Contact Us
               </NavLink>
                <NavLink to ="/" activeStyle>
                LogOut
                </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/account">My Account</NavBtnLink>
                </NavBtn>
            </Nav>

        </>
    )
}

export default Navbar
