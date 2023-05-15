import { Col } from "react-bootstrap";
import "./CustomNav.scss";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";

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
      <Col className="d-none d-md-block" md={3}>
        COLONNA NAVBAR
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
