import React from 'react'
import "./table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const rows = [
{
    id: 1,
    fotografia: "https://www.coolgenerator.com/Pic/Face//male/male1084864485474.jpg",
    nome: "António Costa",
    email: "antonio@mail.pt",
    estado: "Ativo",
    idade: 21
},
{
    id: 2,
    fotografia: "https://www.coolgenerator.com/Pic/Face//female/female20131023588385193.jpg",
    nome: "Ana Silva",
    email: "ana@mail.pt",
    estado: "Ativo",
    idade: 30
},
{
    id: 3,
    fotografia: "https://www.coolgenerator.com/Pic/Face//female/female20161025773184204.jpg",
    nome: "Maria Augusta Pereira",
    email: "ana@mail.pt",
    estado: "Ativo",
    idade: 44
},
{
    id: 4,
    fotografia: "https://www.coolgenerator.com/Pic/Face//female/female20171025946243836.jpg",
    nome: "Rosa Pinheiro",
    email: "rosa@mail.pt",
    estado: "Inativo",
    idade: 50
},
{
    id: 5,
    fotografia: "https://www.coolgenerator.com/Pic/Face//male/male1085310476257.jpg", 
    nome: "António Costa",
    email: "antonio@mail.pt",
    estado: "Ativo",
    idade: 36
},
{
    id: 6,
    fotografia: "https://www.coolgenerator.com/Pic/Face//female/female20161024600973480.jpg",
    nome: "Ana Silva",
    email: "ana@mail.pt",
    estado: "Ativo",
    idade: 40
},
{
    id: 7,
    fotografia: "https://www.coolgenerator.com/Pic/Face//female/female2015102436744495.jpg",
    nome: "Maria Augusta Pereira",
    email: "ana@mail.pt",
    estado: "Ativo",
    idade: 30
},
{
    id: 8,
    fotografia: "https://www.coolgenerator.com/Pic/Face//female/female2016102468385144.jpg",
    nome: "Rosa Pinheiro",
    email: "rosa@mail.pt",
    estado: "Inativo",
    idade: 23
},
]




const TableList = () => {
  return (
    <div className="listaTitle">ÚLTIMAS RESERVAS
<TableContainer component={Paper} className="allTable">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCel">Utilizador</TableCell>
            <TableCell className="tableCel">Email</TableCell>
            <TableCell className="tableCel">Idade</TableCell>
            <TableCell className="tableCel">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCel">
                <div className="cellWrapper">
                    <img src={row.fotografia} alt="" className="img" />
                    {row.nome}
                </div>
              </TableCell>
              <TableCell className="tableCel">{row.email}</TableCell>
              <TableCell className="tableCel">{row.idade}</TableCell>
              <TableCell className="tableCel">
                <span className={`status ${row.estado}`}>{row.estado}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default TableList


