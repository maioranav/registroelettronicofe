import { Col, Container, Row } from "react-bootstrap";
import "./Lezioni.scss";
import { CustomNav } from "../CustomNav/CustomNav";
import { useAppSelector } from "../../app/hooks";
export const Lezioni = () => {
  const loginToken = useAppSelector((state) => state.profile?.token);
  return (
    <Row>
      <CustomNav />
      <Col xs={12} md={9} lg={10}>
        {loginToken.userType !== "User" && <Container className="py-5">Lezioni STUDENTI/DOCENTI</Container>}

        {loginToken.userType === "User" && (
          <Container>
            <Row className="my-5">
              <Col xs={12}>Lezioni</Col>
            </Row>
            <Row>
              <div className="listContainer">Elementi</div>
            </Row>
          </Container>
        )}
      </Col>
    </Row>
  );
};
