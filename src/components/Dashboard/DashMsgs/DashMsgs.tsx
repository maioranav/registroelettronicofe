import "./DashMsgs.scss";
import { IoIosArrowForward } from "react-icons/io";
import { HiBellAlert } from "react-icons/hi2";
import { BsPlusCircleFill } from "react-icons/bs";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { messagesFetch } from "../../../app/reducers/messageSlice";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

interface IDashProps {
  variante: string;
}

export const DashMsgs = ({ variante }: IDashProps) => {
  const dispatch = useAppDispatch();
  const loginToken = useAppSelector((state) => state.profile.token.accessToken);
  const myProfile = useAppSelector((state) => state.myProfile?.myProfile);
  const msgs = useAppSelector((state) => state.msgs);
  const location = useLocation();

  useEffect(() => {
    if (variante === "studente") {
      dispatch(messagesFetch({ accessToken: loginToken, elNo: 2, sort: "data,desc" }));
    } else {
      dispatch(messagesFetch({ accessToken: loginToken, elNo: 4, sort: "data,desc" }));
    }
    //qualcosaqui
  }, [myProfile]);

  return (
    <div className="circolariCorsiMobile">
      <h5>
        <div className="d-flex align-items-center">
          {" "}
          <img src="./icons/note.svg" alt="Circolari" style={{ marginRight: "10px" }} />
          Circolari {location.pathname !== "/segreteria" && "dei tuoi corsi"}
        </div>
        <span className="text-primary">
          {variante === "studente" && <HiBellAlert />}
          <Link to="/messaggi">
            <IoIosArrowForward />
          </Link>
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
                <p>{el.corso?.name}</p>
                <p>{el.msg.substring(0, 40) + "..."}</p>
                <p>{el.data.toString()}</p>
              </div>
            </li>
          ))}
      </ul>
      {variante === "studente" && (
        <>
          <h5>
            <div className="d-flex align-items-center">
              <img src="./icons/cappello.svg" alt="Circolari" style={{ marginRight: "10px" }} />
              Prossimi Appelli
            </div>
          </h5>
          <Row className="d-flex justify-content-between justify-content-md-start appelli">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <Col xs={6} className="appelliDiv">
                <img src="./icons/esami.svg" alt="Appelli d'esame" />
              </Col>
              <p className="textAppelli">Appelli d'esame</p>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <Col xs={6} className="appelliDiv" style={{ backgroundColor: "#fed9ab" }}>
                <img src="./icons/laurea.svg" alt="Appelli d'esame" />
              </Col>
              <p className="textAppelli">Appelli di Laurea</p>
            </div>
          </Row>
        </>
      )}
    </div>
  );
};
