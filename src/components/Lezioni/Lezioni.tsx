import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import "./Lezioni.scss";
import { CustomNav } from "../CustomNav/CustomNav";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./Calendar.scss";
import { format } from "date-fns";
import it from "date-fns/locale/it";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteLezione, lezioniFetchDataEsatta } from "../../app/reducers/lezioniSlice";
import { FcOk } from "react-icons/fc";

export const Lezioni = () => {
  const [valueCal, onChangeCal] = useState(new Date());
  const dispatch = useAppDispatch();
  const loginToken = useAppSelector((state) => state.profile?.token);
  const myProfile = useAppSelector((state) => state.myProfile);
  const lezioni = useAppSelector((state) => state.lezioni);
  const [eliminaLezione, setEliminaLezione] = useState(null as any);

  const handleChangeDate = (e: any) => {
    onChangeCal(e);
  };

  const handleDelete = async () => {
    await dispatch(deleteLezione({ accessToken: loginToken.accessToken, id: eliminaLezione }));
    dispatch(
      lezioniFetchDataEsatta({
        accessToken: loginToken.accessToken,
        data: format(valueCal, "yyyy-MM-dd"),
      })
    );
    setEliminaLezione(null);
  };

  useEffect(() => {
    dispatch(
      lezioniFetchDataEsatta({
        accessToken: loginToken.accessToken,
        data: format(valueCal, "yyyy-MM-dd"),
      })
    );
  }, [valueCal]);

  return (
    <Row>
      <CustomNav />
      <Col xs={12} md={9} lg={10}>
        <Container className="py-5">
          <Row className="d-none d-md-block">
            <Col xs={12} className="greets mb-4">
              Calendario Lezioni
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} lg={3} className="d-flex justify-content-center mb-4">
              <Calendar onChange={handleChangeDate} value={valueCal} />
            </Col>
            <Col xs={12} md={6} lg={8} className="elencoLezioni offset-xl-1 px-4">
              <div className="titoloGiornoSelezionato mb-3">
                <div>
                  <p>{valueCal.getDate()}</p>
                  <p>{format(valueCal, "MMMM", { locale: it })}</p>
                </div>
                <div>
                  <p>{format(valueCal, "eeee", { locale: it })}</p>
                  <p>{lezioni.status !== "failed" && lezioni.lezioni?.length} Lezioni</p>
                </div>
              </div>
              {eliminaLezione !== null && (
                <Alert variant={"warning"} className="my-3">
                  Stai eliminando {eliminaLezione}. Sei sicuro?{" "}
                  <FcOk style={{ marginLeft: 10, marginRight: 10, fontSize: 24 }} onClick={handleDelete} />
                  <img
                    src="../../../icons/delete.svg"
                    alt="Elimina"
                    onClick={() => {
                      setEliminaLezione(null);
                    }}
                  />
                </Alert>
              )}
              <ul>
                {lezioni.status === "failed" && <Alert variant={"danger"}>Servizio non disponibile</Alert>}
                {lezioni.status === "loading" && <Spinner variant={"primary"} />}
                {lezioni.status !== "failed" &&
                  lezioni.lezioni?.length > 0 &&
                  lezioni.lezioni.map((el) => (
                    <li>
                      <div>
                        <p>{el.orario}:00</p>
                        <p>{el.corso.name}</p>
                      </div>
                      <div>
                        {" "}
                        <img
                          src="../../../icons/delete.svg"
                          alt="Elimina"
                          onClick={() => {
                            setEliminaLezione(el.id);
                          }}
                        />
                      </div>
                    </li>
                  ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};
