import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import TableList from "../../components/table/Table";
import React, { Fragment } from 'react';

const Single = () => {

  return (
    <Fragment>
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="margins">
        <div className="lists">
        <div className="top">
          <div className="left">
            <div className="editButton">Editar</div>
            <h1 className="title">Informação do utilizador</h1>
            <div className="item">
              <img
                src="https://www.coolgenerator.com/Pic/Face//female/female2016102468385144.jpg"
                alt="Avatar"
                className="itemImg"
              />
            <div className="details">
                <h1 className="itemTitle">Maria de Lurdes</h1>
              <div className="detailItem">
                <span className="itemKey">Email:</span>
                <span className="itemValue">email@email.com</span>
              </div>
            <div className="detailItem">
              <span className="itemKey">NIF:</span>
               <span className="itemValue">999999999</span>
            </div>
                <div className="detailItem">
                  <span className="itemKey">Data de Nascimento</span>
                  <span className="itemValue">
                  12-12-2020
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Estado:</span>
                  <span className="itemValue">Ativo</span>
                </div>
              </div>
            </div>
            
          </div>
          <div className="right">
        form hjhjh jkh jhjkhhjkhkjhjhkjjh jk kjkkkljklkklk kj  kj kjkkjk kj  jk j kj l lj   ssd sad wqeqed eccx qsixisu xu xzxu oiux  x  px i izxp ihui u
        </div>

        </div>
        </div>
        <div className="bottom">
          <TableList />
        </div>
        </div>
        
      </div>
    </div>
    </Fragment>
  );
};

export default Single;