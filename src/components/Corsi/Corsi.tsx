import { Alert, Button, Col, Container, Pagination, Row, Spinner } from "react-bootstrap";
import "./Corsi.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { corsiFetch, deleteCorso } from "../../app/reducers/corsiSlice";
import { CorsiModal } from "./CorsiModal/CorsiModal";
import { FcOk } from "react-icons/fc";
export const Corsi = () => {
  const dispatch = useAppDispatch();
  const loginToken = useAppSelector((state) => state.profile?.token);
  const corsi = useAppSelector((state) => state.corsi);
  const [page, setPage] = useState(0);
  const [idModale, setIdModale] = useState(null) as any;
  const [show, setShow] = useState(false);
  const [eliminaCorso, setEliminaCorso] = useState({ id: null as any, name: "" });

  const handleClose = () => {
    setShow(false);
    setIdModale(null);
    setTimeout(() => {
      dispatch(corsiFetch({ accessToken: loginToken.accessToken, elNo: 5, page: page }));
    }, 1000);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(corsiFetch({ accessToken: loginToken.accessToken, elNo: 5, page: page }));
  }, []);

  useEffect(() => {
    if (page !== corsi.corsi?.pageable?.pageNumber) {
      setPage(corsi.corsi?.pageable?.pageNumber);
    }
  }, [corsi.corsi?.pageable?.pageNumber]);

  useEffect(() => {
    dispatch(corsiFetch({ accessToken: loginToken.accessToken, elNo: 5, page: page }));
  }, [page]);

  const handlePage = (action: string) => {
    if (action === "prev") {
      if (page - 1 > -1) {
        setPage(page - 1);
      }
    } else if (action === "next") {
      if (page + 1 < corsi.corsi?.totalPages) {
        setPage(page + 1);
      }
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteCorso({ accessToken: loginToken.accessToken, id: eliminaCorso.id }));
    await dispatch(corsiFetch({ accessToken: loginToken.accessToken, elNo: 5, page: page }));
    setEliminaCorso({ id: null as any, name: "" });
  };

  return (
    <Col xs={12} md={9} lg={10}>
      <Container>
        <Row className="my-5">
          <Col xs={12} className="d-flex justify-content-center">
            <div className="w-75 listPageTitle">Corsi</div>
          </Col>
        </Row>
        <Row>
          <div className="listContainer">
            <ul className="p-0">
              {corsi.status === "failed" && <Alert variant={"danger"}>Servizio non disponibile</Alert>}
              {corsi.status === "loading" && <Spinner variant={"primary"} />}
              {corsi.corsi?.content?.length > 0 &&
                corsi.corsi.content.map((el) => (
                  <li key={el.id} className="d-flex justify-content-between py-2 my-2 align-items-center">
                    <div>
                      <p className="listData">ID Corso: {el.id}</p>
                      <p className="listTitle">{el.name}</p>
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
                          setEliminaCorso({ id: el.id, name: el.name });
                        }}
                      />
                    </div>
                  </li>
                ))}
            </ul>
            <Button className="listButtonNew" onClick={handleShow}>
              <img src="../../../icons/plus.svg" alt="Aggiungi" />
              Crea Corso
            </Button>
            {eliminaCorso.id !== null && (
              <Alert variant={"warning"} className="my-3">
                Stai eliminando {eliminaCorso.name}. Sei sicuro?{" "}
                <FcOk style={{ marginLeft: 10, marginRight: 10, fontSize: 24 }} onClick={handleDelete} />
                <img
                  src="../../../icons/delete.svg"
                  alt="Elimina"
                  onClick={() => {
                    setEliminaCorso({ id: null, name: "" });
                  }}
                />
              </Alert>
            )}
            <CorsiModal show={show} handleClose={handleClose} handleShow={handleShow} id={idModale} />
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
                    setPage(corsi.corsi?.totalPages - 1);
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
