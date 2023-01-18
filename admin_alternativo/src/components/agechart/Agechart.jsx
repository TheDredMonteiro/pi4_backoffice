import React from 'react';
import "./agechart.scss";
import { CircularProgressbar, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

const percentagem = 75;

const Agechart = () => {
  return (
    <div className="agechart">
      <div className="top">
        <h1 className="title">VISITAS CONCRETIZADAS</h1>
      </div>
      <div className="bottom">
        <div className="chartAge">
          <CircularProgressbar 
          value={percentagem}
          text={`${percentagem}%`}
          styles={buildStyles({
            textSize: '16px',
            pathTransitionDuration: 0.5,
            pathColor: `#46483C`,
            textColor:  `#46483C`,
            trailColor: `#D3D4A9`,
            strokeWidth: 5
          })}/>
        <div><p className="desc">Leitura qr-code</p></div>
        </div>
      </div>
    </div>
  )
}

export default Agechart