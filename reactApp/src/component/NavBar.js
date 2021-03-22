import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome,faSignOutAlt,faUser,faMapMarked} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="#AADEC0"  style={{backgroundColor:"#AADEC0",fontWeight:'bold',color:'#FFFFFF', height:80}} expand="md">
      <Link to="/home"> <NavbarBrand>
          <img className = "logoSize" src="https://res.cloudinary.com/dgv5agwfj/image/upload/v1614590242/Hotel%20des%20Deux-%C3%8Eles%20%28Room%20Directory%29/LOGO_DEUX_ILES_RVB_hk4avh.png" height="80px"/>
          </NavbarBrand></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>

            <NavItem>
              <Link to="/home"><NavLink style={{color:'#FFFFFF'}} ><FontAwesomeIcon icon={faHome} size={35}/> MyHome</NavLink></Link>
            </NavItem>

            <NavItem>
              <Link to="/recommandation"><NavLink style={{color:'#FFFFFF'}} ><FontAwesomeIcon icon={faMapMarked} size={35}/> Mes recommandations</NavLink></Link>
            </NavItem>

            <NavItem>
            <Link to="/"><NavLink style={{color:'#FFFFFF'}} ><FontAwesomeIcon icon={faSignOutAlt} size={35}/> LogOUT</NavLink></Link>
            </NavItem>

          </Nav>
          <Link to="/account"><NavLink style={{color:'#FFFFFF'}}><FontAwesomeIcon icon={faUser} size={35}/> My Account</NavLink></Link>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;