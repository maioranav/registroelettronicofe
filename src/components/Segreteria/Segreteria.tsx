import { Col, Container } from "react-bootstrap";
import "./Segreteria.scss";
import { Link } from "react-router-dom";
export const Segreteria = () => {
  return (
    <Container>
      <Col>
        PAGINA IN ALLESTIMENTO, VAI AL <Link to="/logout">LOGOUT</Link> O AI <Link to="/contattaci">CONTATTI</Link>
      </Col>
    </Container>
  );
};
