import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container className="my-5">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/wishlist" element={<WishList />} />
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
