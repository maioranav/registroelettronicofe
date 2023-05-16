import { Col, Container, Row } from "react-bootstrap";
import "./Studenti.scss";
export const Studenti = () => {
  return (
    <Col xs={12} md={9} lg={10}>
      <Container>
        <Row className="my-5">
          <Col xs={12}>Studenti</Col>
        </Row>
        <Row>
          <div className="listContainer">Elementi</div>
        </Row>
      </Container>
    </Col>
  );
};
