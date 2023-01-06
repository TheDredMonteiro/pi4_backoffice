import React from "react";
import "./navbar.scss";
import avatar from "../../imagens/avatar.jpg"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="breadcrump">
          <span>Breadcrump</span>
        </div>
        <div className="user">
          <div className="name">
            <div className="iduser">
              <span>Olá, username</span>
            </div>
            <div className="role">
              <span>Administrador</span>
            </div>
          </div>
          <div className="photo">
          <img className="avatar"src={avatar} alt="avatar"/>
          </div>
       </div>
      </div>
    </div>
  )
}

export default Navbar