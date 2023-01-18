import React from 'react';
import "./userchart.scss";
import { AreaChart, Area, XAxis,YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  {name: "Jan", Total: 50},
  {name: "Fev", Total: 90},
  {name: "Mar", Total: 150},
  {name: "Abr", Total: 300},
  {name: "Mai", Total: 350},
  {name: "Jun", Total: 50},
  {name: "Jul", Total: 80},
  {name: "Ago", Total: 90},
  {name: "Set", Total: 400},
  {name: "Out", Total: 50},
  {name: "Nov", Total: 65},
  {name: "Dez", Total: 250}
];

const Userchart = () => {
  return (
    <div className="userchart">
    <div className="title">UTILIZADORES REGISTADOS</div>
      <ResponsiveContainer width="100%" height={300}>
      <AreaChart width={730} height={250} data={data}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#46483C" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#46483C" stopOpacity={0}/>
    </linearGradient>

  </defs>
  <XAxis dataKey="name" color="#D3D4A9"/>
  <YAxis />
  <CartesianGrid strokeDasharray="3 3" />

  <Area type="monotone" dataKey="Total" stroke="#46483C" fillOpacity={0.5} fill="url(#total)" />
  
</AreaChart>
      </ResponsiveContainer>
  </div>
  )
}

export default Userchart