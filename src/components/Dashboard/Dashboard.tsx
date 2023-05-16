import { Col, Container, Row } from "react-bootstrap";
import "./Dashboard.scss";
import { Profile } from "../Profile/Profile";
import { DashCalendar } from "./DashCalendar/DashCalendar";
import { DashMsgs } from "./DashMsgs/DashMsgs";
import { useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomNav } from "../CustomNav/CustomNav";
import { PresenzeChart } from "../PresenzeChart/PresenzeChart";

interface IDashProps {
  variante: string;
}

export const Dashboard = ({ variante }: IDashProps) => {
  const myProfile = useAppSelector((state) => state.myProfile);
  const navigate = useNavigate();

  useEffect(() => {
    if (!myProfile.myProfile?.id) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Row>
        <CustomNav />
        <Col xs={12} md={9} lg={10}>
          <Container className="px-4">
            <Profile variante={variante} />
            <DashCalendar />
            {variante === "docente" ? (
              <Row>
                <Col xs={12} lg={6} className="d-none d-lg-block">
                  <PresenzeChart />
                </Col>
                <Col xs={12} lg={6}>
                  <DashMsgs variante={variante} />
                </Col>
              </Row>
            ) : (
              <DashMsgs variante={variante} />
            )}
          </Container>
        </Col>
      </Row>
    </>
  );
};
