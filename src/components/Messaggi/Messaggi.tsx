import "./Messaggi.scss";
import { CustomNav } from "../CustomNav/CustomNav";
import { IoIosArrowForward } from "react-icons/io";
import { HiBellAlert } from "react-icons/hi2";
import { BsPlusCircleFill } from "react-icons/bs";
import { useEffect } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { messagesFetch } from "../../app/reducers/messageSlice";
export const Messaggi = () => {
  const dispatch = useAppDispatch();
  const loginToken = useAppSelector((state) => state.profile?.token);
  const msgs = useAppSelector((state) => state.msgs);
  const location = useLocation();

  useEffect(() => {
    dispatch(messagesFetch({ accessToken: loginToken.accessToken, elNo: 8, sort: "data,desc" }));
  }, []);
  return (
    <Row>
      <CustomNav />
      <Col xs={12} md={9} lg={10}>
        {loginToken.userType !== "User" && (
          <Container className="py-5">
            <div className="circolariCorsiMobile">
              <h5>
                <div className="d-flex align-items-center">
                  <img src="./icons/note.svg" alt="Circolari" style={{ marginRight: "10px" }} />
                  Circolari {location.pathname !== "/segreteria" && "dei tuoi corsi"}
                </div>
                <span className="text-primary">
                  {loginToken.userType === "Studente" && <HiBellAlert />}
                  {loginToken.userType === "Docente" && <BsPlusCircleFill />}
                </span>
              </h5>
              <ul>
                {msgs.status === "loading" && <Spinner variant={"primary"} />}
                {msgs.status === "failed" && <Alert variant={"danger"}>Servizio non disponibile</Alert>}

                {msgs.status !== "failed" &&
                  msgs?.messages?.content.length > 0 &&
                  msgs.messages?.content.map((el) => (
                    <li key={el.id} className="mb-3">
                      <div className="d-flex justify-content-center">
                        <img src="./icons/messaggio.svg" alt="Messaggio" className="iconaMessaggio" />
                      </div>
                      <div>
                        <p>{el.corso.name}</p>
                        <p>{el.msg.substring(0, 40) + "..."}</p>
                        <p>{el.data.toString()}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </Container>
        )}

        {loginToken.userType === "User" && (
          <Container>
            <Row className="my-5">
              <Col xs={12}>Messaggi</Col>
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
