import { Button, Col, Row } from "react-bootstrap";
import "./HomePage.scss";

export const HomePage = () => {
  return (
    <>
      <Row>
        <Col xs={12} lg={6} className="leftColumn"></Col>
        <Col xs={12} lg={6} className="d-flex p-4 justify-content-center rightColumn flex-column align-items-center align-items-md-start">
          <h1>UniVincenzo.it</h1>
          <h3 className="d-none d-md-block">Dove Innovazione e Tecnologia, rappresentano il futuro!</h3>
          <Button className="mt-4 rounded-4">Log In</Button>
        </Col>
      </Row>
    </>
  );
};
