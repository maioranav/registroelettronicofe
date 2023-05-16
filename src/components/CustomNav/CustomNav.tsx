import { Col } from "react-bootstrap";
import "./CustomNav.scss";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";

export const CustomNav = () => {
  const location = useLocation();
  const loginToken = useAppSelector((state) => state.profile);
  const myProfile = useAppSelector((state) => state.myProfile);
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
          <div className="navBarProfile">
            <img
              src={loginToken.token?.userType === "Studente" ? "../../../imgs/studenteavatar.png" : "../../../imgs/docenteavatar.png"}
              alt="Profile Avatar"
            />
            <span>{myProfile.myProfile?.name}</span>
          </div>
          <Link
            to={
              loginToken.token?.userType === "Docente" ? "/dashdocente" : loginToken.token?.userType === "Studente" ? "/dashstudente" : "/segreteria"
            }
            className={
              location.pathname === "/segreteria" || location.pathname === "/dashdocente" || location.pathname === "/dashstudente"
                ? "sideBarLink active"
                : "sideBarLink"
            }
          >
            <img src="./icons/navbar/home.svg" alt="" height={"16px"} width={"16px"} />
            Home
          </Link>
          <Link to="/corsi" className={location.pathname === "/corsi" ? "sideBarLink active" : "sideBarLink"}>
            <img src="./icons/navbar/corsi.svg" alt="" height={"16px"} width={"16px"} />
            Corsi
          </Link>
          <Link to="/docenti" className={location.pathname === "/docenti" ? "sideBarLink active" : "sideBarLink"}>
            <img src="./icons/navbar/docenti.svg" alt="" height={"16px"} width={"16px"} />
            Docenti
          </Link>
          <Link to="/studenti" className={location.pathname === "/studenti" ? "sideBarLink active" : "sideBarLink"}>
            <img src="./icons/navbar/profile.svg" alt="" height={"16px"} width={"16px"} />
            Studenti
          </Link>
          <Link to="/messaggi" className={location.pathname === "/messaggi" ? "sideBarLink active" : "sideBarLink"}>
            <img src="./icons/navbar/chat.svg" alt="" height={"16px"} width={"16px"} />
            Messaggi
          </Link>
          <Link to="/lezioni" className={location.pathname === "/lezioni" ? "sideBarLink active" : "sideBarLink"}>
            <img src="./icons/navbar/calendar.svg" alt="" height={"16px"} width={"16px"} />
            Lezioni
          </Link>
        </div>
        <div className="d-flex flex-column">
          <li className="sideBarLink">
            <img src="./icons/navbar/settings.svg" alt="" height={"16px"} width={"16px"} />
            Impostazioni
          </li>
          <Link to="/logout" className="sideBarLink">
            <img src="./icons/navbar/logout.svg" alt="" height={"16px"} width={"16px"} />
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
