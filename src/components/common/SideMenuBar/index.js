import React, { useState } from 'react';

import {Link} from 'react-router-dom'

// ICONS
import { IoMdHome } from 'react-icons/io'

// STYLES
import {
  Menu,
  WrapperMenu,
 } from './styles'

// API
import api from '../../../services/tasks'
import logo from "../../../img/logo1.png";



// eslint-disable-next-line import/no-anonymous-default-export
export default ({hide}) => {
  const [menuOptions, ] = useState(api);

  return (
  <Menu show={hide}>
    <WrapperMenu>

      <Link to="/">
        <IoMdHome size={30} color="#4d4848" />
        Home
      </Link>


      {
        menuOptions.map( (menuLine) =>  (
          <Link to={`/tasks/${menuLine.id}`} key={menuLine.id}>
              <img src={menuLine.avatar} alt={menuLine.subject}></img>
              <span>{menuLine.subject}</span>
          </Link>))
      }

    </WrapperMenu>
    <img src={logo} style={{ maxWidth:"100%",width: "auto", height: "100%" }} alt="" />
  </Menu>)
}
