import React from 'react'
import "./widget.scss"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonIcon from '@mui/icons-material/Person';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Widget = ({ type }) => {

    let data;

    //temporario
    const diff = 20;
    const amount = 100;

    switch(type){
        case "user":
            data = {
                title: "UTILIZADORES",
                isMoney: false,
                link: "Ver todos",
                icon: <PersonIcon className="icon" />,
            };
        break;
        case "reservas":
            data = {
                title: "RESERVAS",
                isMoney: false,
                link: "Ver todas",
                icon: <BeenhereIcon className="icon" />,
            };
        break;
        case "visitas":
            data = {
                title: "VISITAS",
                isMoney: false,
                link: "Ver todas",
                icon: <DirectionsWalkIcon className="icon" />,
            };
        break;
        case "recompensas":
            data = {
                title: "RECOMPENSAS",
                isMoney: false,
                link: "Ver todas",
                icon: <EmojiEventsIcon className="icon" />,
            };
        break;
        default:
    break;
    }


  return (
    <div className="widget">
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">{data.isMoney && "$"}{amount}</span>
            <span className="link">{data.link}</span>
        </div>
        <div className="right">
            <div className="percentage positive">
            <KeyboardArrowUpIcon />
            {diff}%
            </div>
            {data.icon}
        </div>
    </div>
  )
}

export default Widget