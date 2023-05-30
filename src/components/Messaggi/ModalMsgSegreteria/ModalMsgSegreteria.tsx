import { FormEvent, useEffect, useState } from "react";
import { Corso, Docente } from "../../../app/custominterfaces";
import { useAppSelector } from "../../../app/hooks";
import "./ModalMsgSegreteria.scss";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import { IMessage } from "../../../app/reducers/messageSlice";
import { format } from "date-fns";

interface DocentiPropModal {
  show: boolean;
  handleClose: () => void;
  handleShow?: () => void;
  id?: number | null;
}

export const ModalMsgSegreteria = ({ id, show, handleClose, handleShow }: DocentiPropModal) => {
  const loginToken = useAppSelector((state) => state.profile?.token);
  const [mesg, setMsg] = useState({ messaggio: { msg: "", data: new Date() } as IMessage, status: "idle" });
  const [allDocenti, setAllDocenti] = useState([] as Docente[]);
  const [corsiEnabled, setCorsiEnabled] = useState([] as Corso[]);

  const fetchMessaggio = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_APIURL + "/msgs/" + id, {
        method: "GET",
        headers: { Authorization: "Bearer " + loginToken.accessToken },
      });
      if (response.ok) {
        const data: IMessage = await response.json();
        setMsg({ messaggio: data, status: "idle" });
      } else {
        setMsg({ messaggio: { msg: "", data: new Date() }, status: "failed" });
      }
    } catch (error) {
      setMsg({ messaggio: { msg: "", data: new Date() }, status: "failed" });
    }
  };

  const putPostMessaggio = async (method: string, bodyContent: IMessage) => {
    try {
      const response = await fetch(process.env.REACT_APP_APIURL + "/msgs", {
        method,
        headers: { Authorization: "Bearer " + loginToken.accessToken, "Content-Type": "application/json" },
        body: JSON.stringify(bodyContent),
      });
      if (!response.ok) {
        console.log("Errore nella richiesta");
        setMsg({ ...mesg, status: "failed" });
      }
    } catch (error) {
      console.log(error);
      setMsg({ ...mesg, status: "failed" });
    }
  };

  const fetchAllDocenti = async () => {
    try {
      let response = await fetch(process.env.REACT_APP_APIURL + "/docenti/all", {
        method: "GET",
        headers: { Authorization: "Bearer " + loginToken.accessToken },
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

  const fetchCorsiDocenti = async () => {
    try {
      let response = await fetch(process.env.REACT_APP_APIURL + "/corsi/docente/" + mesg.messaggio.docente?.id, {
        method: "GET",
        headers: { Authorization: "Bearer " + loginToken.accessToken },
      });
      if (response.ok) {
        const data: Corso[] = await response.json();
        setCorsiEnabled(data);
        return data;
      } else {
        const res = await response.json();
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initModal = async () => {
    await fetchAllDocenti();
    if (id != null && id !== undefined) {
      await fetchMessaggio();
    } else {
      setMsg({ messaggio: { msg: "", data: new Date() } as IMessage, status: "idle" });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(id);
    if (id != null && id !== undefined) {
      putPostMessaggio("PUT", mesg.messaggio);
    } else {
      putPostMessaggio("POST", mesg.messaggio);
    }
  };

  useEffect(() => {
    initModal();
  }, [id]);

  useEffect(() => {
    fetchCorsiDocenti();
  }, [mesg.messaggio.docente?.id]);

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg({ ...mesg, messaggio: { ...mesg.messaggio, msg: e.target.value } });
  };
  const handleDocente = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMsg({ ...mesg, messaggio: { ...mesg.messaggio, docente: allDocenti?.find((el) => el.id + "" === e.target.value) } });
    fetchCorsiDocenti();
  };
  const handleData = (e: React.ChangeEvent<HTMLDataElement>) => {
    setMsg({ ...mesg, messaggio: { ...mesg.messaggio, data: format(new Date(e.target.value), "yyyy-MM-dd") } });
  };

  const handleCorso = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMsg({ ...mesg, messaggio: { ...mesg.messaggio, corso: corsiEnabled?.find((el) => el.id + "" === e.target.value) } });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit}>
          <Modal.Header>
            {id === null && <Modal.Title>Crea nuovo Messaggio</Modal.Title>}
            {id !== null && <Modal.Title>Modifica Messaggio</Modal.Title>}
          </Modal.Header>
          <Modal.Body>
            {mesg.status === "loading" && <Spinner variant="primary" />}
            {mesg.status === "failed" && <Alert variant="danger">Qualcosa è andato storto!</Alert>}
            {mesg.status === "idle" && (
              <>
                <div className="formModalComponent">
                  <label htmlFor="msg">Messaggio: </label>
                  <input type="text" id="msg" value={mesg.messaggio?.msg} onChange={handleText} />
                </div>
                <div className="formModalComponent">
                  <label htmlFor="docente">Docente: </label>
                  <select id="docente" onChange={handleDocente}>
                    <option value={0}>Seleziona un docente</option>
                    {allDocenti.map((el) => (
                      <option value={el.id}>{el.name + " " + el.surname}</option>
                    ))}
                  </select>
                </div>
                <div className="formModalComponent">
                  <label htmlFor="corso">Corso: </label>
                  <select id="corso" onChange={handleCorso}>
                    <option value={0}>Seleziona un corso</option>
                    {corsiEnabled?.map((el) => (
                      <option value={el.id}>{el.name}</option>
                    ))}
                  </select>
                </div>
                <div className="formModalComponent">
                  <label htmlFor="date">Data: </label>
                  <input type="date" id="date" onChange={handleData} />
                </div>
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
