import { Col, Container, Row } from "react-bootstrap";
import "./Segreteria.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { CustomNav } from "../CustomNav/CustomNav";
export const Segreteria = () => {
  const myProfile = useAppSelector((state) => state.myProfile);
  const loginToken = useAppSelector((state) => state.profile);
  const navigate = useNavigate();
  useEffect(() => {
    if (!myProfile.myProfile?.id && !loginToken.token?.role.find((role) => role.roleName === "ROLE_ADMIN")) {
      navigate("/");
    }
  }, []);

  return (
    <Row>
      <CustomNav />
      <Col xs={12} md={9} lg={10}>
        <Container className="px-4">Contenuto della dash di segreteria</Container>
      </Col>
    </Row>
  );
};
