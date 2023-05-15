import { Col } from "react-bootstrap";
import "./CustomNav.scss";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { Profile } from "../Profile/Profile";

export const CustomNav = () => {
  const location = useLocation();
  const loginToken = useAppSelector((state) => state.profile);
  const [homeLink, setHomeLink] = useState("/dashboard");

  useEffect(() => {
    if (loginToken.token?.userType === "Studente") {
      setHomeLink("/dashstudente");
    } else if (loginToken.token?.userType === "Docente") {
      setHomeLink("/dashdocente");
    }
  }, []);

  return (
    <>
      <Col className="sideBar d-none d-md-flex flex-column justify-content-between p-5" md={3} lg={2}>
        <div className="navLogo">
          <img src="./logo192.png" alt="Logo" width={"100px"} height={"100px"} />
          UniVincenzo.it
        </div>
        <div className="d-flex flex-column">
          <Link to="/" className="sideBarLink">
            <img src="./icons/navbar/home.svg" alt="" height={"16px"} />
            Home
          </Link>
          <Link to="/" className="sideBarLink">
            <img src="./icons/navbar/home.svg" alt="" height={"16px"} />
            Corsi
          </Link>
          <Link to="/" className="sideBarLink">
            <img src="./icons/navbar/home.svg" alt="" height={"16px"} />
            Docenti
          </Link>
          <Link to="/" className="sideBarLink">
            <img src="./icons/navbar/home.svg" alt="" height={"16px"} />
            Studenti
          </Link>
          <Link to="/" className="sideBarLink">
            <img src="./icons/navbar/home.svg" alt="" height={"16px"} />
            Messaggi
          </Link>
          <Link to="/" className="sideBarLink">
            <img src="./icons/navbar/home.svg" alt="" height={"16px"} />
            Lezioni
          </Link>
        </div>
        <div className="d-flex flex-column">
          <Link to="/" className="sideBarLink">
            <img src="./icons/navbar/home.svg" alt="" height={"16px"} />
            Impostazioni
          </Link>
          <Link to="/" className="sideBarLink">
            <img src="./icons/navbar/home.svg" alt="" height={"16px"} />
            Logout
          </Link>
        </div>
      </Col>
      <div className="fixed-bottom d-flex d-md-none justify-content-evenly mb-3 navBarDown">
        <Link to={homeLink}>
          <img
            src="./icons/navbar/home.svg"
            alt="Home"
            className={location.pathname === "/dashstudente" || location.pathname === "/dashdocente" ? "active" : ""}
          />
        </Link>
        <Link to="/calendario">
          <img src="./icons/navbar/calendar.svg" alt="Calendario" className={location.pathname === "/calendario" ? "active" : ""} />
        </Link>
        <Link to="/messaggi">
          <img src="./icons/navbar/chat.svg" alt="Messaggi" className={location.pathname === "/messaggi" ? "active" : ""} />
        </Link>
        <Link to="/profilo">
          <img src="./icons/navbar/profile.svg" alt="Profilo" className={location.pathname === "/profilo" ? "active" : ""} />
        </Link>
      </div>
    </>
  );
};
