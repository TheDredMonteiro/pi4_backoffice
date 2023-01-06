import React from "react";
import "./sidebar.scss";
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import RoomIcon from '@mui/icons-material/Room';
import MapIcon from '@mui/icons-material/Map';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import logo from "../../imagens/simbolo_cursar.png"
import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/backoffice" style={{textDecoration: "none"}}>
        <span className="logo"><img src={logo} alt="Simbolo Cursar"/></span>
        </Link>
      </div>
      <div className="center">
        <ul>

          <Link to="/backoffice" style={{textDecoration: "none"}}>
          <li>
          <BarChartIcon className="iconMenu"/>
          <span className="nomeMenu">Dashboard</span>
          </li>
          </Link>

          <Link to="/backoffice/utilizadores" style={{textDecoration: "none"}}>
          <li>
          <PersonIcon className="iconMenu"/>
          <span className="nomeMenu">Utilizadores</span>
          </li>
          </Link>

          <Link to="/backoffice/pontos-interesse" style={{textDecoration: "none"}}>
          <li>
          <RoomIcon className="iconMenu"/>
          <span className="nomeMenu">Pontos de Interesse</span>
          </li>
          </Link>

          <Link to="/backoffice/regioes" style={{textDecoration: "none"}}>
          <li>
          <MapIcon className="iconMenu"/>
          <span className="nomeMenu">Regiões</span>
          </li>
          </Link>

          <Link to="/backoffice/recompensas" style={{textDecoration: "none"}}>
          <li>
          <EmojiEventsIcon className="iconMenu"/>
          <span className="nomeMenu">Recompensas</span>
          </li>
          </Link>

          <Link to="/backoffice/landing-page" style={{textDecoration: "none"}}>
          <li>
          <InsertDriveFileIcon className="iconMenu"/>
          <span className="nomeMenu">Página web</span>
          </li>
          </Link>

        </ul>

      </div>
      <div className="bottom av nav-sidebar">
        
        <ul>

          <Link to="/backoffice/utilizadores/1" style={{textDecoration: "none"}}>
          <li>
          <AccountCircleIcon className="iconMenu"/>
          <span className="nomeMenu">Perfil</span>
          </li>
          </Link>

          <Link to="/backoffice/logout" style={{textDecoration: "none"}}>
          <li>
          <PowerSettingsNewIcon className="iconMenu"/>
          <span className="nomeMenu">Sair</span>
          </li>
          </Link>

        </ul>
      </div>
    </div>
  )
}

export default Sidebar