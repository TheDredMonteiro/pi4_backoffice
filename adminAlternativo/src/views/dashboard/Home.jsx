import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Userchart from "../../components/userchart/Userchart";
import Agechart from "../../components/agechart/Agechart";
import Table from "../../components/table/Table";


const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="margins">
          <div className="widgets">
            <Widget type="user"/>
            <Widget type="reservas"/>
            <Widget type="visitas"/>
            <Widget type="recompensas"/>
          </div>
          <div className="charts">
            <Userchart />
            <Agechart />
          </div>
          <div className="listContainer">
              <Table />
              </div>
            </div>
          </div>
        </div>
  )
}

export default Home