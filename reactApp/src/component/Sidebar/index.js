import React from 'react'
import {SideBarContainer,Icon,CloseIcon,SideBarLink,SideBarWrapper,SideBarMenu,SideBtnWrap,SideBarRoute} from './SideBarElements'
import '../../App.css';


const Sidebar = () => {
    return (
        <>
            <SideBarContainer>
               <Icon>
                   <CloseIcon/>
               </Icon>
                <SideBarWrapper>
                    <SideBarMenu>
                        <SideBarLink to="/about">About</SideBarLink>
                        <SideBarLink to="/discover">Discover</SideBarLink>
                        <SideBarLink to="/services">Services</SideBarLink>
                        <SideBarLink to="/signup">SignUp</SideBarLink>
                    </SideBarMenu>
                    <SideBtnWrap>
                        <SideBarRoute to="/signin">SignIn</SideBarRoute>
                    </SideBtnWrap>


                </SideBarWrapper>
            </SideBarContainer>

        </>
    )
}

export default Sidebar;
