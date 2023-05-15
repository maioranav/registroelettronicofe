import { Col, Container, Row } from "react-bootstrap";
import "./Dashboard.scss";
import { Profile } from "../Profile/Profile";
import { DashCalendar } from "./DashCalendar/DashCalendar";
import { DashMsgs } from "./DashMsgs/DashMsgs";

interface IDashProps {
  variante: string;
}

export const Dashboard = ({ variante }: IDashProps) => {
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
