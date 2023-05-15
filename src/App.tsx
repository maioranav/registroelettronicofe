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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/segreteria" element={<Segreteria />} />
          <Route path="/dashstudente" element={<Dashboard variante="studente" />} />
          <Route path="/dashdocente" element={<Dashboard variante="docente" />} />
          <Route path="/contattaci" element={<Contattaci />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
