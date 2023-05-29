import { Button, Modal } from "react-bootstrap";
import "./CorsiModal.scss";
import { FormEvent, useEffect, useState } from "react";
import { Corso, Docente } from "../../../app/custominterfaces";
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
  const [allDocenti, setAllDocenti] = useState<Docente[]>();
  const [docente, setDocente] = useState<Docente>();
  const [dataState, setDataState] = useState({ name: "" } as Corso);

  const fetchCorso = async ({ id, method = "GET", body }: fetchParam) => {
    try {
      let response;
      if (method === "GET") {
        response = await fetch(process.env.REACT_APP_APIURL + "/corsi/id/" + id, {
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

  const fetchAllDocenti = async () => {
    try {
      let response = await fetch(process.env.REACT_APP_APIURL + "/docenti/all", {
        method: "GET",
        headers: { Authorization: "Bearer " + loginToken.token?.accessToken },
      });
      if (response.ok) {
        const data: Docente[] = await response.json();
        setAllDocenti(data);
        return data;
      } else {
        const res = await response.json();
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (dataState.id != null) {
      fetchCorso({ method: "PUT", body: { id: dataState.id, name: dataState.name, plesso: { id: 1 }, docente: docente } });
    } else {
      fetchCorso({ method: "POST", body: { name: dataState.name, plesso: { id: 1 }, docente: docente } });
    }
  };

  const handleDocente = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let selezionato = allDocenti?.find((el) => el.id + "" === e.target.value);
    setDocente(selezionato);
  };

  useEffect(() => {
    if (id != null) {
      fetchCorso({ id });
    }
    fetchAllDocenti();
  }, [id]);

  return (
    <>
      <Modal className="corsomodale" show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit}>
          <Modal.Header>
            {id === null && <Modal.Title>Crea nuovo corso</Modal.Title>}
            {id !== null && <Modal.Title>Modifica Corso</Modal.Title>}
          </Modal.Header>
          <Modal.Body>
            <div>
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
            </div>
            <div>
              <label htmlFor="docente">Docente:</label>
              <select id="docente" onChange={handleDocente}>
                <option value={"null"}>Seleziona docente...</option>
                {allDocenti?.map((el) => (
                  <option key={"doc" + el.id} value={el.id}>
                    {el.name + " " + el.surname}
                  </option>
                ))}
              </select>
            </div>
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
