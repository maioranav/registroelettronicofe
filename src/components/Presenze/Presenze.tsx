import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { ILezione } from "../../app/reducers/lezioniSlice";
import "./Presenze.scss";
import { useState, useEffect, FormEvent } from "react";
import { Studente } from "../../app/custominterfaces";

interface PresenzeProps {
  id: number;
  show: boolean;
  handleClose: () => void;
}

export const Presenze = ({ id, show, handleClose }: PresenzeProps) => {
  const loginToken = useAppSelector((state) => state.profile?.token);
  const [lezione, setLezione] = useState({ lezione: { data: new Date(), corso: {}, orario: 9 } as ILezione, status: "idle" });
  const [studenti, setStudenti] = useState({ studenti: [] as Studente[], status: "idle" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchPutLezione(lezione.lezione);
    handleClose();
  };

  const fetchLezione = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_APIURL + "/lezioni/" + id, {
        method: "GET",
        headers: { Authorization: "Bearer " + loginToken.accessToken },
      });
      if (response.ok) {
        const data: ILezione = await response.json();
        setLezione({ lezione: data, status: "idle" });
      } else {
        setLezione({ lezione: { data: new Date(), corso: {}, orario: 9 } as ILezione, status: "failed" });
      }
    } catch (error) {
      setLezione({ lezione: { data: new Date(), corso: {}, orario: 9 } as ILezione, status: "failed" });
    }
  };

  const fetchStudenti = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_APIURL + "/studenti/corsi/" + lezione.lezione.corso?.id, {
        method: "GET",
        headers: { Authorization: "Bearer " + loginToken.accessToken },
      });
      if (response.ok) {
        const data: Studente[] = await response.json();
        setStudenti({ studenti: data, status: "idle" });
      } else {
        setStudenti({ studenti: [] as Studente[], status: "failed" });
      }
    } catch (error) {
      setStudenti({ studenti: [] as Studente[], status: "failed" });
    }
  };

  const fetchPutLezione = async (context: ILezione) => {
    try {
      const response = await fetch(process.env.REACT_APP_APIURL + "/lezioni", {
        method: "PUT",
        headers: { Authorization: "Bearer " + loginToken.accessToken, "Content-Type": "application/json" },
        body: JSON.stringify(context),
      });
      if (!response.ok) {
        console.log(response.json());
      }
    } catch (e) {
      console.log(e);
    }
  };

  const initModal = async () => {
    await fetchLezione();
  };

  useEffect(() => {
    if (id !== undefined) {
      initModal();
    }
  }, [id, show]);

  useEffect(() => {
    fetchStudenti();
  }, [lezione.lezione.corso?.id]);

  const handlePresenza = (e: React.ChangeEvent<HTMLInputElement>) => {
    let presenzefetchate = [];
    let studentecambiato = studenti.studenti.find((el) => el.id + "" === e.target.value);
    if (studentecambiato !== undefined) {
      presenzefetchate = lezione.lezione?.presenze != undefined ? [...lezione.lezione?.presenze] : [];
      if (presenzefetchate?.find((el) => el.id === studentecambiato?.id) !== undefined) {
        let filtered = presenzefetchate.filter((el) => el.id !== studentecambiato?.id);
        setLezione({ ...lezione, lezione: { ...lezione.lezione, presenze: filtered } });
      } else {
        studentecambiato !== undefined && presenzefetchate.push(studentecambiato);
        setLezione({ ...lezione, lezione: { ...lezione.lezione, presenze: presenzefetchate } });
      }
    }
  };

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false}>
        <form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>Aggiorna Presenze</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bodyLezione">
            {lezione.status === "failed" && <Alert variant="danger">Servizio non disponibile</Alert>}
            {lezione.status === "loading" && <Spinner variant="primary" />}
            {lezione.status === "idle" && (
              <>
                <div>{lezione.lezione.corso.name}</div>
                <div>Gestione Presenze:</div>
                <ul>
                  {studenti.studenti.map((el) => (
                    <li key={el.id}>
                      <input
                        type="checkbox"
                        onChange={handlePresenza}
                        value={el.id}
                        checked={lezione.lezione?.presenze?.find((e) => e.id === el.id) !== undefined ? true : false}
                      />
                      <p>{el.name + " " + el.surname}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
            <Button variant="primary" type="submit">
              Aggiorna
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
