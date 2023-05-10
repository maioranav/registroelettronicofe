import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { Container } from "react-bootstrap";
import { Login } from "./components/Login/Login";
import { Contattaci } from "./components/Contattaci/Contattaci";
import { Logout } from "./components/Logout/Logout";
import { NotFound } from "./components/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container className="my-5">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/contattaci" element={<Contattaci />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
