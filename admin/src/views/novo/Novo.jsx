import React, {useState} from 'react'
import "./novo.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlineIcon from "@mui/icons-material/DriveFolderUploadOutlined";



const New = ({inputs}) => {

const [file, setFile] = useState("");

  return (
    <div className="novo">
    <Sidebar />
    <div className="novoContainer">
      <Navbar />
      <div className="margins">
          <div className="lists">
          <div className="top">
          <div className="left">
          <img src={file ? URL.createObjectURL(file) : "https://www.hopkinsmedicine.org/-/media/feature/noimageavailable.ashx?mw=560&mh=320&hash=A258055CDF6293CC1D8ED48F041003D6"} 
          alt="noimage" />
          </div>
          <div className="right">
            <form>
            <div className="formInput">
                <label htmlFor='file'>
                  Fotografia: <DriveFolderUploadOutlineIcon className="icon"/></label>
                <input 
                type="file" 
                id="file" 
                onChange={(e) => setFile(e.target.files[0])}
                style={{display:"none"}}/>
              </div>

              {inputs.map((input) =>(
                <div className="formInput">
                <label>{input.label}</label>
                <input type={input.type} placeholder={input.placeholder} />
              </div>
              ))}
              
              <button>Enviar</button>
            </form>
          </div>
          </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default New