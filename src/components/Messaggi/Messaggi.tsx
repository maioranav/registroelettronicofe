import "./Messaggi.scss";
import { CustomNav } from "../CustomNav/CustomNav";
import { HiBellAlert } from "react-icons/hi2";
import { BsPlusCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Pagination, Row, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteMessaggio, messagesFetch } from "../../app/reducers/messageSlice";
import { FcOk } from "react-icons/fc";
import { ModalMsgDocente } from "./ModalMsgDocente/ModalMsgDocente";
import { ModalMsgSegreteria } from "./ModalMsgSegreteria/ModalMsgSegreteria";
import { profile } from "console";

export const Messaggi = () => {
  const dispatch = useAppDispatch();
  const loginToken = useAppSelector((state) => state.profile?.token);
  const msgs = useAppSelector((state) => state.msgs);
  const [page, setPage] = useState(0);
  const [eliminaMessaggio, setEliminaMessaggio] = useState({ id: null as any, name: "" });
  const myProfile = useAppSelector((state) => state.myProfile?.myProfile);
  const [show, setShow] = useState(false);
  const [idModale, setIdModale] = useState(null) as any;
  const location = useLocation();

  useEffect(() => {
    if (loginToken.userType === "Studente" || loginToken.userType === "Docente") {
      dispatch(messagesFetch({ accessToken: loginToken.accessToken, elNo: 8, sort: "data,desc" }));
    } else {
      dispatch(messagesFetch({ accessToken: loginToken.accessToken, elNo: 5, sort: "data,desc" }));
    }
  }, [myProfile]);
  useEffect(() => {
    if (page !== msgs.messages?.pageable?.pageNumber) {
      setPage(msgs.messages?.pageable?.pageNumber);
    }
  }, [msgs.messages?.pageable?.pageNumber]);

  useEffect(() => {
    dispatch(messagesFetch({ accessToken: loginToken.accessToken, elNo: 5, sort: "data,desc" }));
  }, [page]);

  const handlePage = (action: string) => {
    if (action === "prev") {
      if (page - 1 > -1) {
        setPage(page - 1);
      }
    } else if (action === "next") {
      if (page + 1 < msgs.messages?.totalPages) {
        setPage(page + 1);
      }
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteMessaggio({ accessToken: loginToken.accessToken, id: eliminaMessaggio.id }));
    dispatch(messagesFetch({ accessToken: loginToken.accessToken, elNo: 5, sort: "data,desc" }));
    setEliminaMessaggio({ id: null as any, name: "" });
  };

  const handleClose = () => {
    setTimeout(() => {
      setShow(false);
      setIdModale(null);
      dispatch(messagesFetch({ accessToken: loginToken.accessToken, elNo: 5, sort: "data,desc" }));
    }, 1000);
  };
  const handleShow = () => setShow(true);

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
                  {loginToken.userType === "Docente" && <BsPlusCircleFill onClick={handleShow} />}
                </span>
              </h5>
              <ul>
                {msgs.status === "loading" && <Spinner variant={"primary"} />}
                {msgs.status === "failed" && <Alert variant={"danger"}>Servizio non disponibile</Alert>}

                {msgs.status !== "failed" &&
                  msgs?.messages?.content.length > 0 &&
                  msgs.messages?.content.map((el) => (
                    <li
                      key={el.id}
                      className="mb-3"
                      onClick={() => {
                        if (loginToken.userType === "Docente") {
                          if (el.docente?.id === myProfile.id) {
                            setIdModale(el.id);
                            handleShow();
                          }
                        }
                      }}
                    >
                      <div className="d-flex justify-content-center">
                        <img src="./icons/messaggio.svg" alt="Messaggio" className="iconaMessaggio" />
                      </div>
                      <div>
                        <p>{el.corso?.name}</p>
                        <p>{el.msg.substring(0, 80) + "..."}</p>
                        <p>{el.data.toString()}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <ModalMsgDocente show={show} handleClose={handleClose} handleShow={handleShow} id={idModale} />
          </Container>
        )}

        {loginToken.userType === "User" && (
          <Container>
            <Row className="my-5">
              <Col xs={12} className="d-flex justify-content-center">
                <div className="w-75 listPageTitle">Messaggi</div>
              </Col>
            </Row>
            <Row>
              <div className="listContainer">
                <ul className="p-0">
                  {msgs.status === "failed" && <Alert variant={"danger"}>Servizio non disponibile</Alert>}
                  {msgs.status === "loading" && <Spinner variant={"primary"} />}
                  {msgs.messages?.content?.length > 0 &&
                    msgs.messages?.content.map((el) => (
                      <li key={el.id} className="d-flex justify-content-between py-2 my-2 align-items-center">
                        <div>
                          <p className="listData">{`${el.data} - ${el.corso?.name} - Prof. ${el.docente?.name.charAt(0)} ${el.docente?.surname}`}</p>
                          <p className="listTitle">{el.msg.substring(0, 100)}</p>
                        </div>
                        <div className="listIcone d-flex">
                          <img
                            src="../../../icons/modifica.svg"
                            alt="Modifica"
                            onClick={() => {
                              setIdModale(el.id);
                              handleShow();
                            }}
                          />
                          <img
                            src="../../../icons/delete.svg"
                            alt="Elimina"
                            onClick={() => {
                              setEliminaMessaggio({ id: el.id, name: el.id + "" });
                            }}
                          />
                        </div>
                      </li>
                    ))}
                </ul>
                <Button className="listButtonNew" onClick={handleShow}>
                  <img src="../../../icons/plus.svg" alt="Aggiungi" />
                  Crea Messaggio
                </Button>
                {eliminaMessaggio.id !== null && (
                  <Alert variant={"warning"} className="my-3">
                    Stai eliminando {eliminaMessaggio.name}. Sei sicuro?{" "}
                    <FcOk style={{ marginLeft: 10, marginRight: 10, fontSize: 24 }} onClick={handleDelete} />
                    <img
                      src="../../../icons/delete.svg"
                      alt="Elimina"
                      onClick={() => {
                        setEliminaMessaggio({ id: null, name: "" });
                      }}
                    />
                  </Alert>
                )}
                <ModalMsgSegreteria show={show} handleClose={handleClose} handleShow={handleShow} id={idModale} />
                <div className="my-4 d-flex justify-content-center" style={{ border: "none" }}>
                  <Pagination>
                    <Pagination.First
                      onClick={() => {
                        setPage(0);
                      }}
                    />
                    <Pagination.Prev
                      onClick={() => {
                        handlePage("prev");
                      }}
                    />
                    <Pagination.Ellipsis disabled />
                    <Pagination.Item active>{page + 1}</Pagination.Item>
                    <Pagination.Ellipsis disabled />
                    <Pagination.Next
                      onClick={() => {
                        handlePage("next");
                      }}
                    />
                    <Pagination.Last
                      onClick={() => {
                        setPage(msgs.messages?.totalPages - 1);
                      }}
                    />
                  </Pagination>
                </div>
              </div>
            </Row>
          </Container>
        )}
      </Col>
    </Row>
  );
};
