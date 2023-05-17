import { Alert, Button, Col, Container, Pagination, Row, Spinner } from "react-bootstrap";
import "./Corsi.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { corsiFetch } from "../../app/reducers/corsiSlice";
export const Corsi = () => {
  const dispatch = useAppDispatch();
  const loginToken = useAppSelector((state) => state.profile?.token);
  const corsi = useAppSelector((state) => state.corsi);
  const [page, setPage] = useState(0);

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
                      <img src="../../../icons/modifica.svg" alt="Modifica" />
                      <img src="../../../icons/listpresenze.svg" alt="Lista Presenze" />
                      <img src="../../../icons/delete.svg" alt="Elimina" />
                    </div>
                  </li>
                ))}
            </ul>
            <Button className="listButtonNew">
              <img src="../../../icons/plus.svg" alt="Aggiungi" />
              Crea Corso
            </Button>
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
