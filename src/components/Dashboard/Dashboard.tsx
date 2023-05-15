import { Col, Container, Row } from "react-bootstrap";
import "./Dashboard.scss";
import { Profile } from "../Profile/Profile";
import { DashCalendar } from "./DashCalendar/DashCalendar";
import { DashMsgs } from "./DashMsgs/DashMsgs";
import { useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        <Col xs={12}>
          <Container className="px-4">
            <Profile variante={variante} />
            <DashCalendar />
            <DashMsgs variante={variante} />
          </Container>
        </Col>
      </Row>
    </>
  );
};
