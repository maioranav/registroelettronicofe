import { Alert, Button, Col, Container, Pagination, Row, Spinner } from "react-bootstrap";
import "./Studenti.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { deleteStudente, studentiFetch } from "../../app/reducers/studentiSlice";
import { FcOk } from "react-icons/fc";
import { StudentiModal } from "./StudentiModal/StudentiModal";

export const Studenti = () => {
  const dispatch = useAppDispatch();
  const loginToken = useAppSelector((state) => state.profile?.token);
  const studenti = useAppSelector((state) => state.studenti);
  const [page, setPage] = useState(0);
  const [eliminaStudente, setEliminaStudente] = useState({ id: null as any, name: "" });
  const [show, setShow] = useState(false);
  const [idModale, setIdModale] = useState<number | undefined | null>();

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setIdModale(null);
      dispatch(studentiFetch({ accessToken: loginToken.accessToken, elNo: 5, page: page, sort: "surname" }));
    }, 1000);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(studentiFetch({ accessToken: loginToken.accessToken, elNo: 5, page: page, sort: "surname" }));
  }, []);

  useEffect(() => {
    if (page !== studenti.studenti?.pageable?.pageNumber) {
      setPage(studenti.studenti?.pageable?.pageNumber);
    }
  }, [studenti.studenti?.pageable?.pageNumber]);

  useEffect(() => {
    dispatch(studentiFetch({ accessToken: loginToken.accessToken, elNo: 5, page: page, sort: "surname" }));
  }, [page]);

  const handlePage = (action: string) => {
    if (action === "prev") {
      if (page - 1 > -1) {
        setPage(page - 1);
      }
    } else if (action === "next") {
      if (page + 1 < studenti.studenti?.totalPages) {
        setPage(page + 1);
      }
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteStudente({ accessToken: loginToken.accessToken, id: eliminaStudente.id }));
    dispatch(studentiFetch({ accessToken: loginToken.accessToken, elNo: 5, page: page, sort: "surname" }));
    setEliminaStudente({ id: null as any, name: "" });
  };

  return (
    <Col xs={12} md={9} lg={10}>
      <Container>
        <Row className="my-5">
          <Col xs={12} className="d-flex justify-content-center">
            <div className="w-75 listPageTitle">Studenti</div>
          </Col>
        </Row>
        <Row>
          <div className="listContainer">
            <ul className="p-0">
              {studenti.status === "failed" && <Alert variant={"danger"}>Servizio non disponibile</Alert>}
              {studenti.status === "loading" && <Spinner variant={"primary"} />}
              {studenti.studenti?.content?.length > 0 &&
                studenti.studenti.content.map((el) => (
                  <li key={el.id} className="d-flex justify-content-between py-2 my-2 align-items-center">
                    <div>
                      <p className="listData">{`${el.username} (${el.id})`}</p>
                      <p className="listTitle">{el.name + " " + el.surname}</p>
                    </div>
                    <div className="listIcone">
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
                          setEliminaStudente({ id: el.id, name: el.username });
                        }}
                      />
                    </div>
                  </li>
                ))}
            </ul>
            <Button className="listButtonNew" onClick={handleShow}>
              <img src="../../../icons/plus.svg" alt="Aggiungi" />
              Crea Studente
            </Button>
            {eliminaStudente.id !== null && (
              <Alert variant={"warning"} className="my-3">
                Stai eliminando {eliminaStudente.name}. Sei sicuro?{" "}
                <FcOk style={{ marginLeft: 10, marginRight: 10, fontSize: 24 }} onClick={handleDelete} />
                <img
                  src="../../../icons/delete.svg"
                  alt="Elimina"
                  onClick={() => {
                    setEliminaStudente({ id: null, name: "" });
                  }}
                />
              </Alert>
            )}
            <StudentiModal show={show} handleClose={handleClose} handleShow={handleShow} id={idModale} />
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
                    setPage(studenti.studenti?.totalPages - 1);
                  }}
                />
              </Pagination>
            </div>
          </div>
        </Row>
      </Container>
    </Col>
  );
};
