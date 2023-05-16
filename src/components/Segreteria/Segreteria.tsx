import { Col, Container, Row } from "react-bootstrap";
import "./Segreteria.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { CustomNav } from "../CustomNav/CustomNav";
import { DashMsgs } from "../Dashboard/DashMsgs/DashMsgs";
import { DashCalendar } from "../Dashboard/DashCalendar/DashCalendar";
import { PresenzeChart } from "../PresenzeChart/PresenzeChart";
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
        <Container className="px-4">
          <Row>
            <Col xs={12} className="greets mt-4">
              DashBoard Segreteria
            </Col>
          </Row>
          <Row className="my-3">
            <Col xs={12}>
              <DashCalendar />
            </Col>
          </Row>
          <Row className="my-3">
            <Col xs={12} lg={6} className="mb-5 d-none d-lg-block">
              <div style={{ marginLeft: "-30px" }}>
                <PresenzeChart />
              </div>
            </Col>
            <Col xs={12} lg={6}>
              <DashMsgs variante={"null"} />
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};
