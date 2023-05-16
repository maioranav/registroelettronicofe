import { Row } from "react-bootstrap";
import "./Segreteria.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { CustomNav } from "../CustomNav/CustomNav";
import { Corsi } from "../Corsi/Corsi";
import { Docenti } from "../Docenti/Docenti";
import { DashSegreteria } from "../DashSegreteria/DashSegreteria";
import { Studenti } from "../Studenti/Studenti";

export const Segreteria = () => {
  const myProfile = useAppSelector((state) => state.myProfile);
  const loginToken = useAppSelector((state) => state.profile);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!myProfile.myProfile?.id && !loginToken.token?.role.find((role) => role.roleName === "ROLE_ADMIN")) {
      navigate("/");
    }
  }, []);

  return (
    <Row>
      <CustomNav />
      {pathname === "/corsi" && <Corsi />}
      {pathname === "/docenti" && <Docenti />}
      {pathname === "/studenti" && <Studenti />}
      <DashSegreteria />
    </Row>
  );
};
