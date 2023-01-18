import React from "react";
import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";

const List = () => {
  return (
<div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="margins">
          <div className="lists">
            <Datatable />
          </div>
        </div>
      </div>
   </div>
  )
}

export default List