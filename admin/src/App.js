import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import Home from "./views/dashboard/Home";
import Login from "./views/login/Login";
import List from "./views/list/List";
import Single from "./views/single/Single";
import Novo from "./views/novo/Novo";
import { userInputs, landingPageInputs, pontoInputs, recompensaInputs, regiaoInputs } from './formSource';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/backoffice">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="utilizadores">
              <Route index element={<List />}/>
              <Route path=":utilizadorId" element={<Single />}/>
              <Route path="novo" element={<Novo inputs={userInputs} title="Adicionar novo utilizador" />}/>
            </Route>
            <Route path="pontos-interesse">
              <Route index element={<List />}/>
              <Route path=":pontosId" element={<Single />}/>
              <Route path="novo" element={<Novo inputs={pontoInputs} title="Adicionar novo ponto de interesse"/>}/>
            </Route>
            <Route path="regioes">
              <Route index element={<List />}/>
              <Route path=":regiaoId" element={<Single />}/>
              <Route path="novo" element={<Novo inputs={regiaoInputs} title="Adicionar nova região"/>}/>
            </Route>
            <Route path="recompensas">
              <Route index element={<List />}/>
              <Route path=":recompensaId" element={<Single />}/>
              <Route path="novo" element={<Novo inputs={recompensaInputs} title="Adicionar nova Recompensa"/>}/>
            </Route>
            <Route path="landing-page">
              <Route index element={<List />}/>
              <Route path=":landingId" element={<Single />}/>
              <Route path="novo" element={<Novo inputs={landingPageInputs} title="Editar Landing Page"/>}/>
            </Route>
          </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
