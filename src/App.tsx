import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { Login } from "./components/Login/Login";
import { Contattaci } from "./components/Contattaci/Contattaci";
import { Logout } from "./components/Logout/Logout";
import { NotFound } from "./components/NotFound/NotFound";
import { HomePage } from "./components/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contattaci" element={<Contattaci />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
