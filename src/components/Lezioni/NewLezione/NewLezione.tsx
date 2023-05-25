import { Alert, Button, Modal } from "react-bootstrap";
import { Corso } from "../../../app/custominterfaces";
import { useState, useEffect, FormEvent } from "react";
import { useAppSelector } from "../../../app/hooks";
import { ILezione } from "../../../app/reducers/lezioniSlice";
import { format } from "date-fns";

interface NewLezioneProp {
  show: boolean;
  handleClose: () => void;
  data: Date;
}

export const NewLezione = ({ show, handleClose, data }: NewLezioneProp) => {
  const [corsiAll, setCorsiAll] = useState({ corsi: [] as Corso[], status: "idle" });
  const loginToken = useAppSelector((state) => state.profile?.token);
  const [corsoLezione, setCorsoLezione] = useState({} as Corso);
  const [orario, setOrario] = useState(9);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let lezione = {
      data: format(data, "yyyy-MM-dd"),
      corso: corsoLezione,
      orario: orario,
    };
    fetchPostLezione(lezione);
    handleClose();
  };

  const handleOrario = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrario(e.target.valueAsNumber);
  };
  const handleCorso = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let corso = corsiAll.corsi?.find((el) => el.id + "" === e.target.value);
    corso !== undefined ? setCorsoLezione(corso) : setCorsoLezione({} as Corso);
  };

  useEffect(() => {
    fetchAllCorsi();
  }, [show]);

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

  const fetchPostLezione = async (context: ILezione) => {
    try {
      const response = await fetch(process.env.REACT_APP_APIURL + "/lezioni", {
        method: "POST",
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

  return (
    <Modal show={show} backdrop="static" keyboard={false}>
      <form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Scegli un corso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {corsiAll.status === "failed" && <Alert variant="danger">Servizio non disponibile</Alert>}
          {corsiAll.status === "idle" && (
            <>
              <div>
                <label htmlFor="orario">Orario:</label>
                <div>
                  <input type="number" max={23} min={0} id="orario" value={orario} onChange={handleOrario} />
                  <span>:00</span>
                </div>
              </div>
              <div>
                <label htmlFor="corso">Corso:</label>
                <select id="corso" onChange={handleCorso}>
                  <option>Scegli un corso</option>
                  {corsiAll.corsi.map((corso) => (
                    <option value={corso.id}>{corso.name}</option>
                  ))}
                </select>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Aggiungi
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
