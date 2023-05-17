import { Button, Col, Container, Pagination, Row } from "react-bootstrap";
import "./Docenti.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { docentiFetch } from "../../app/reducers/docentiSlice";
export const Docenti = () => {
  const dispatch = useAppDispatch();
  const loginToken = useAppSelector((state) => state.profile?.token);
  const docenti = useAppSelector((state) => state.docenti);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(docentiFetch({ accessToken: loginToken.accessToken, elNo: 5, page: page, sort: "surname" }));
  }, []);

  useEffect(() => {
    if (page !== docenti.docenti?.pageable?.pageNumber) {
      setPage(docenti.docenti?.pageable?.pageNumber);
    }
  }, [docenti.docenti?.pageable?.pageNumber]);

  useEffect(() => {
    dispatch(docentiFetch({ accessToken: loginToken.accessToken, elNo: 5, page: page, sort: "surname" }));
  }, [page]);

  const handlePage = (action: string) => {
    if (action === "prev") {
      if (page - 1 > -1) {
        setPage(page - 1);
      }
    } else if (action === "next") {
      if (page + 1 < docenti.docenti?.totalPages) {
        setPage(page + 1);
      }
    }
  };

  return (
    <Col xs={12} md={9} lg={10}>
      <Container>
        <Row className="my-5">
          <Col xs={12} className="d-flex justify-content-center">
            <div className="w-75 listPageTitle">Docenti</div>
          </Col>
        </Row>
        <Row>
          <div className="listContainer">
            <ul className="p-0">
              {docenti.docenti?.content?.length > 0 &&
                docenti.docenti.content.map((el) => (
                  <li key={el.id} className="d-flex justify-content-between py-2 my-2 align-items-center">
                    <div>
                      <p className="listData">{`${el.username} (${el.id})`}</p>
                      <p className="listTitle">{el.name + " " + el.surname}</p>
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
              Crea Docente
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
                    setPage(docenti.docenti?.totalPages - 1);
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
