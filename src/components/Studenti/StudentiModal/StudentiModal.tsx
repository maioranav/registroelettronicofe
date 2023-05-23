import { FormEvent, useEffect, useState } from "react";
import { Corso, Studente } from "../../../app/custominterfaces";
import { useAppSelector } from "../../../app/hooks";
import "./StudentiModal.scss";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";

interface StudentiPropModal {
  show: boolean;
  handleClose: () => void;
  handleShow?: () => void;
  id?: number | null;
}

export const StudentiModal = ({ id, show, handleClose, handleShow }: StudentiPropModal) => {
  const loginToken = useAppSelector((state) => state.profile?.token);
  const [corsiAll, setCorsiAll] = useState({ corsi: [] as Corso[], status: "idle" });
  const [studente, setStudente] = useState({ studente: { email: "", name: "", surname: "", username: "", corsi: [] } as Studente, status: "idle" });

  const fetchStudente = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_APIURL + "/studenti/id/" + id, {
        method: "GET",
        headers: { Authorization: "Bearer " + loginToken.accessToken },
      });
      if (response.ok) {
        const data: Studente = await response.json();
        setStudente({ studente: data, status: "idle" });
      } else {
        setStudente({ studente: { email: "", name: "", surname: "", username: "", corsi: [] }, status: "failed" });
      }
    } catch (error) {
      setStudente({ studente: { email: "", name: "", surname: "", username: "", corsi: [] }, status: "failed" });
    }
  };

  const fetchAllCorsi = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_APIURL + "/corsi/all", {
        method: "GET",
        headers: { Authorization: "Bearer " + loginToken.accessToken },
      });
      if (response.ok) {
        const data: Corso[] = await response.json();
        setCorsiAll({ corsi: data, status: "idle" });
      } else {
        setCorsiAll({ corsi: [], status: "failed" });
      }
    } catch (error) {
      setCorsiAll({ corsi: [], status: "failed" });
    }
  };

  const putPostStudente = async (method: string, bodyContent: Studente) => {
    try {
      const response = await fetch(process.env.REACT_APP_APIURL + "/studenti", {
        method,
        headers: { Authorization: "Bearer " + loginToken.accessToken, "Content-Type": "application/json" },
        body: JSON.stringify(bodyContent),
      });
      if (!response.ok) {
        console.log("Errore nella richiesta");
        setStudente({ ...studente, status: "failed" });
      }
    } catch (error) {
      console.log(error);
      setStudente({ ...studente, status: "failed" });
    }
  };

  const initModal = async () => {
    fetchAllCorsi();
    if (id != null && id !== undefined) {
      await fetchStudente();
    } else {
      setStudente({ studente: { email: "", name: "", surname: "", username: "", corsi: [] } as Studente, status: "idle" });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(id);
    if (id != null && id !== undefined) {
      putPostStudente("PUT", studente.studente);
    } else {
      putPostStudente("POST", studente.studente);
    }
  };

  useEffect(() => {
    initModal();
  }, [id]);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudente({ ...studente, studente: { ...studente.studente, name: e.target.value } });
  };
  const handleSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudente({ ...studente, studente: { ...studente.studente, surname: e.target.value } });
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudente({ ...studente, studente: { ...studente.studente, email: e.target.value } });
  };

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudente({ ...studente, studente: { ...studente.studente, username: e.target.value } });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudente({ ...studente, studente: { ...studente.studente, password: e.target.value } });
  };

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>, c: Corso) => {
    if (studente.studente.corsi !== undefined) {
      var arrayList: Corso[] = [...studente.studente.corsi];
    } else {
      var arrayList: Corso[] = [];
    }

    if (event.target.checked === true) {
      arrayList.filter((el) => el.id === c.id);
      arrayList.push(c);
    } else {
      arrayList.filter((el) => el.id === c.id);
    }
    setStudente({ ...studente, studente: { ...studente.studente, corsi: arrayList } });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit}>
          <Modal.Header>
            {id === null && <Modal.Title>Crea nuovo Studente</Modal.Title>}
            {id !== null && <Modal.Title>Modifica Studente</Modal.Title>}
          </Modal.Header>
          <Modal.Body>
            {studente.status === "loading" && <Spinner variant="primary" />}
            {studente.status === "failed" && <Alert variant="danger">Qualcosa è andato storto!</Alert>}
            {studente.status === "idle" && (
              <>
                <div className="formModalComponent">
                  <label htmlFor="name">Nome: </label>
                  <input type="text" id="name" value={studente.studente.name} onChange={handleName} />
                </div>
                <div className="formModalComponent">
                  <label htmlFor="surname">Cognome: </label>
                  <input type="text" id="surname" value={studente.studente.surname} onChange={handleSurname} />
                </div>
                <div className="formModalComponent">
                  <label htmlFor="email">Email: </label>
                  <input type="email" id="email" value={studente.studente.email} onChange={handleEmail} />
                </div>
                <div className="formModalComponent">
                  <label htmlFor="username">Username: </label>
                  <input type="text" id="username" value={studente.studente.username} onChange={handleUserName} />
                </div>
                <div className="formModalComponent">
                  <label htmlFor="password">Password: </label>
                  <input type="password" id="password" value={studente.studente.password} onChange={handlePassword} />
                </div>
                {corsiAll.corsi && corsiAll.corsi?.length > 0 && (
                  <div className="corsiModalComponent">
                    <label>Corsi Assegnati:</label>
                    <div>
                      <ul>
                        {corsiAll.corsi?.map((c) => (
                          <li key={c.id}>
                            <input
                              type="checkbox"
                              onChange={(event) => {
                                handleSelect(event, c);
                              }}
                            />
                            <p>{c.name}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </>
            )}
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
