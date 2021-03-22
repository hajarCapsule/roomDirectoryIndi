import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,

} from 'reactstrap';
import {Link} from 'react-router-dom'

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="#AADEC0"  style={{backgroundColor:"#AADEC0",fontWeight:'bold',color:'#FFFFFF'}} expand="md">
        <NavbarBrand href="/home">
          <img className = "logoSize" src="https://res.cloudinary.com/dgv5agwfj/image/upload/v1614590242/Hotel%20des%20Deux-%C3%8Eles%20%28Room%20Directory%29/LOGO_DEUX_ILES_RVB_hk4avh.png"/>
          </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem  >
              <Link to="/home"><NavLink style={{color:'#FFFFFF'}} >MyHome</NavLink></Link>
            </NavItem>
            <NavItem>
            <Link to="/home"><NavLink style={{color:'#FFFFFF'}} href="/">LogOUT</NavLink></Link>
            </NavItem>

          </Nav>
          <NavLink href="/account">My Account</NavLink>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;