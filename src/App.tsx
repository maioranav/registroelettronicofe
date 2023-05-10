import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustHeader />
        <Container className="my-5">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/contactme" element={<ContactMe />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <CustFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
