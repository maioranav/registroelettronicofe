import { Button, Modal } from "react-bootstrap";
import "./CorsiModal.scss";
import { FormEvent, useEffect, useState } from "react";
import { Corso } from "../../../app/custominterfaces";
import { useAppSelector } from "../../../app/hooks";
import { Form } from "react-router-dom";

interface CorsiModalProps {
  show: boolean;
  handleClose: () => void;
  handleShow?: () => void;
  id?: number | null;
}

interface fetchParam {
  id?: number | null;
  method?: string;
  body?: Corso;
}

export const CorsiModal = ({ show, handleClose, id }: CorsiModalProps) => {
  const loginToken = useAppSelector((state) => state.profile);
  const [dataState, setDataState] = useState({ name: "" } as Corso);

  const fetchCorso = async ({ id, method = "GET", body }: fetchParam) => {
    try {
      let response;
      if (method === "GET") {
        response = await fetch(process.env.REACT_APP_APIURL + "/corsi/" + id, {
          method,
          headers: { Authorization: "Bearer " + loginToken.token?.accessToken },
        });
      } else if (method === "POST") {
        response = await fetch(process.env.REACT_APP_APIURL + "/corsi", {
          method,
          headers: { Authorization: "Bearer " + loginToken.token?.accessToken, "Content-Type": "application/JSON" },
          body: JSON.stringify(body),
        });
      } else {
        response = await fetch(process.env.REACT_APP_APIURL + "/corsi", {
          method,
          headers: { Authorization: "Bearer " + loginToken.token?.accessToken, "Content-Type": "application/JSON" },
          body: JSON.stringify(body),
        });
      }
      if (response.ok) {
        const data: Corso = await response.json();
        method === "GET" ? setDataState(data) : setDataState({ name: "" } as Corso);
        return data;
      } else {
        const res = await response.json();
        console.log(res.message);
        return Promise.reject(res.message);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (dataState.id != null) {
      fetchCorso({ method: "PUT", body: { id: dataState.id, name: dataState.name, plesso: { id: 1 } } });
    } else {
      fetchCorso({ method: "POST", body: { name: dataState.name, plesso: { id: 1 } } });
    }
  };

  useEffect(() => {
    if (id != null) {
      fetchCorso({ id });
    }
  }, [id]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            {id === null && <Modal.Title>Crea nuovo corso</Modal.Title>}
            {id !== null && <Modal.Title>Modifica Corso</Modal.Title>}
          </Modal.Header>
          <Modal.Body>
            <label htmlFor="name">Nome Corso:</label>
            <input
              type="text"
              id="name"
              placeholder="Nome Corso"
              value={dataState.name}
              onChange={(e) => {
                setDataState({ ...dataState, name: e.target.value });
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Salva
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
