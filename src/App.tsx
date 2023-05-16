import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { Login } from "./components/Login/Login";
import { Contattaci } from "./components/Contattaci/Contattaci";
import { Logout } from "./components/Logout/Logout";
import { NotFound } from "./components/NotFound/NotFound";
import { HomePage } from "./components/HomePage/HomePage";
import { Segreteria } from "./components/Segreteria/Segreteria";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Messaggi } from "./components/Messaggi/Messaggi";
import { Lezioni } from "./components/Lezioni/Lezioni";
import { EditProfilo } from "./components/EditProfilo/EditProfilo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/segreteria" element={<Segreteria />} />
          <Route path="/messaggi" element={<Messaggi />} />
          <Route path="/lezioni" element={<Lezioni />} />
          <Route path="/corsi" element={<Segreteria />} />
          <Route path="/docenti" element={<Segreteria />} />
          <Route path="/studenti" element={<Segreteria />} />
          <Route path="/profilo" element={<EditProfilo />} />
          <Route path="/dashstudente" element={<Dashboard variante="studente" />} />
          <Route path="/dashdocente" element={<Dashboard variante="docente" />} />
          <Route path="/recover" element={<Contattaci />} />
          <Route path="/contattaci" element={<Dashboard variante="contattaci" />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
