import { Button, Col, Container, Pagination, Row } from "react-bootstrap";
import "./Corsi.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { corsiFetch } from "../../app/reducers/corsiSlice";
export const Corsi = () => {
  const dispatch = useAppDispatch();
  const loginToken = useAppSelector((state) => state.profile?.token);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(corsiFetch({ accessToken: loginToken.accessToken, elNo: 5, page: page }));
  }, []);

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
              {
                <li className="d-flex justify-content-between py-2 my-2 align-items-center">
                  <div>
                    <p className="listData">Data</p>
                    <p className="listTitle">Titolo - Nome Docente</p>
                  </div>
                  <div className="listIcone">
                    <img src="../../../icons/modifica.svg" alt="Modifica" />
                    <img src="../../../icons/listpresenze.svg" alt="Lista Presenze" />
                    <img src="../../../icons/delete.svg" alt="Elimina" />
                  </div>
                </li>
              }
            </ul>
            <Button className="listButtonNew">
              <img src="../../../icons/plus.svg" alt="Aggiungi" />
              Crea Corso
            </Button>
            <div className="my-4 d-flex justify-content-center" style={{ border: "none" }}>
              <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Ellipsis disabled />
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Ellipsis disabled />
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </div>
          </div>
        </Row>
      </Container>
    </Col>
  );
};
