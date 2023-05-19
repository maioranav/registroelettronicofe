import { FormEvent, useEffect, useState } from "react";
import { Corso, Docente } from "../../../app/custominterfaces";
import { useAppSelector } from "../../../app/hooks";
import "./DocentiModal.scss";
import { Button, Modal } from "react-bootstrap";

interface DocentiPropModal {
  show: boolean;
  handleClose: () => void;
  handleShow?: () => void;
  id?: number | null;
}

export const DocentiModal = ({ id, show, handleClose, handleShow }: DocentiPropModal) => {
  const loginToken = useAppSelector((state) => state.profile?.token);
  const [allCorsi, setAllCorsi] = useState({ corsi: [] as Corso[], status: "idle" });
  const [docente, setDocente] = useState({ docente: { email: "", name: "", surname: "", username: "" } as Docente, status: "idle" });

  const fetchAllCorsi = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_APIURL + "/corsi/all", {
        method: "GET",
        headers: { Authorization: "Bearer " + loginToken.accessToken },
      });
      if (response.ok) {
        const data: Corso[] = await response.json();
        setAllCorsi({ corsi: data, status: "idle" });
      } else {
        setAllCorsi({ corsi: [], status: "failed" });
      }
    } catch (error) {
      setAllCorsi({ corsi: [], status: "failed" });
    }
  };

  const fetchDocente = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_APIURL + "/docenti/" + id, {
        method: "GET",
        headers: { Authorization: "Bearer " + loginToken.accessToken },
      });
      if (response.ok) {
        const data: Docente = await response.json();
        setDocente({ docente: data, status: "idle" });
      } else {
        setDocente({ docente: { email: "", name: "", surname: "", username: "" }, status: "failed" });
      }
    } catch (error) {
      setAllCorsi({ corsi: [], status: "failed" });
    }
  };

  const putPostDocente = async (method: string, bodyContent: Docente) => {
    try {
      const response = await fetch(process.env.REACT_APP_APIURL + "/docenti", {
        method,
        headers: { Authorization: "Bearer " + loginToken.accessToken, "Content-Type": "application/json" },
        body: JSON.stringify(bodyContent),
      });
      if (response.ok) {
        const data: Docente = await response.json();
        // handleClose();
      } else {
        console.log("Errore nella richiesta");
        setDocente({ ...docente, status: "failed" });
      }
    } catch (error) {
      console.log(error);
      setDocente({ ...docente, status: "failed" });
    }
  };

  const initModal = async () => {
    await fetchAllCorsi();
    if (id != null && id !== undefined) {
      await fetchDocente();
    } else {
      setDocente({ docente: { email: "", name: "", surname: "", username: "" } as Docente, status: "idle" });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(id);
    if (id != null && id !== undefined) {
      putPostDocente("PUT", docente.docente);
    } else {
      putPostDocente("POST", docente.docente);
    }
  };

  useEffect(() => {
    initModal();
  }, [id]);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocente({ ...docente, docente: { ...docente.docente, name: e.target.value } });
  };
  const handleSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocente({ ...docente, docente: { ...docente.docente, surname: e.target.value } });
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocente({ ...docente, docente: { ...docente.docente, email: e.target.value } });
  };

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocente({ ...docente, docente: { ...docente.docente, username: e.target.value } });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocente({ ...docente, docente: { ...docente.docente, password: e.target.value } });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit}>
          <Modal.Header>
            {id === null && <Modal.Title>Crea nuovo Docente</Modal.Title>}
            {id !== null && <Modal.Title>Modifica Docente</Modal.Title>}
          </Modal.Header>
          <Modal.Body>
            <div>
              <label htmlFor="name">Nome: </label>
              <input type="text" id="name" value={docente.docente.name} onChange={handleName} />
            </div>
            <div>
              <label htmlFor="surname">Cognome: </label>
              <input type="text" id="surname" value={docente.docente.surname} onChange={handleSurname} />
            </div>
            <div>
              <label htmlFor="email">Email: </label>
              <input type="email" id="email" value={docente.docente.email} onChange={handleEmail} />
            </div>
            <div>
              <label htmlFor="username">Username: </label>
              <input type="text" id="username" value={docente.docente.username} onChange={handleUserName} />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <input type="password" id="password" value={docente.docente.password} onChange={handlePassword} />
            </div>
            <div>
              <label>Elencocorsi </label>
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
