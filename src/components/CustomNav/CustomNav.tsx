import { Col } from "react-bootstrap";
import "./CustomNav.scss";
import { Link, useLocation } from "react-router-dom";

export const CustomNav = () => {
  const location = useLocation();
  return (
    <>
      <Col className="d-none d-md-block" md={3}>
        COLONNA NAVBAR
      </Col>
      <div className="fixed-bottom d-flex d-md-none justify-content-evenly mb-3 navBarDown">
        <Link to="/">
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
