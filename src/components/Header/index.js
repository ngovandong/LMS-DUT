import React , { useState } from 'react';
import {Link, useHistory} from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';

import { Container , HeaderButton, HeaderAvatar } from './styles'

// ICONS
import {  IoMdAdd , IoMdApps } from 'react-icons/io'

// MENUS
import HamburguerMenu from '../common/SideMenuBar'

import {HamburguerButton} from './style-hamburguer-button'
import Button from '@restart/ui/esm/Button';


function Header() {
  const [showHamburguer, setShowHamburguer] = useState(false);
  const history = useHistory();
  const onClickHamburguer = (e) => setShowHamburguer(!showHamburguer);
  const {logout,getPhoto}=useAuth();
  async function handleLogout(e){
    e.preventDefault();

    try {
      await logout();
      history.push("/login");
    } catch (error) {
      console.log(error);

    }
  }
  return (
  <>
    <Container>

      <HamburguerButton style={{lineHeight:"100%"}} show={showHamburguer} onClick={(e) => onClickHamburguer(e)}>
        <div></div>
        <div></div>
        <div></div>
      </HamburguerButton>
      
      <Link to="/" className="fw-bold" style={{margin:"0 15px"}}>LMS-DUT</Link>
      <img style={{height:"40px",width:"40px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTNvoNPGPqvJJXxvq64QtFFp6CreUzVxEoFy5vh-IuzhK6O4y0VQNP6l7DcskyrVPjxESo&usqp=CAU"/>
      <div className="groupButtons">

        <HeaderButton className="addBtn">
          <IoMdAdd size={25} color="rgb(77, 72, 72)" />
        </HeaderButton>

        <HeaderButton className="appBtn">
          <IoMdApps size={25}  color="rgb(77, 72, 72)"/>
        </HeaderButton>

        <HeaderAvatar className="imgAvatar" src={getPhoto()} alt="Unknown"/>

        <Button className="fw-bold  btn btn-light" style={{padding:"10px",marginRight:"20px"}} onClick={handleLogout}>Logout</Button>

      </div>

    </Container>

    <HamburguerMenu
      hide={showHamburguer} />
  </>
  );
}

export default Header;
