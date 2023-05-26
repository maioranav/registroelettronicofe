import { Alert, Button, Modal } from "react-bootstrap";
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

  const fetchStudenti = async (idCorso: number) => {
    try {
      const response = await fetch(process.env.REACT_APP_APIURL + "/studenti/corsi/" + idCorso, {
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
    await fetchStudenti(lezione.lezione.corso?.id as number);
  };

  useEffect(() => {
    initModal();
  }, [id]);

  const handlePresenza = (e: React.ChangeEvent<HTMLInputElement>) => {
    let arrayPresenti;
    if (lezione.lezione?.presenze?.find((el) => el.id + "" === e.target.value) !== undefined) {
      let filtered = studenti.studenti.filter((el) => el.id + "" !== e.target.value);
      setLezione({ ...lezione, lezione: { ...lezione.lezione, presenze: filtered } });
    } else {
      let studente = studenti.studenti.find((el) => el.id + "" === e.target.value);
      if (lezione.lezione.presenze !== undefined && lezione.lezione !== undefined) {
        arrayPresenti = lezione.lezione.presenze;
      } else {
        arrayPresenti = [] as Studente[];
      }
      if (studente !== undefined) {
        arrayPresenti.push(studente);
      }
      setLezione({ ...lezione, lezione: { ...lezione.lezione, presenze: arrayPresenti } });
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
            {lezione.status === "idle" && (
              <>
                <div>Titolo Lezione</div>
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
