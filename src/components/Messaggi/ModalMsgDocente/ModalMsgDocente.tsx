import { FormEvent, useEffect, useState } from "react";
import { Corso, Docente } from "../../../app/custominterfaces";
import { useAppSelector } from "../../../app/hooks";
import "./ModalMsgDocente.scss";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import { IMessage } from "../../../app/reducers/messageSlice";
import { format } from "date-fns";

interface DocentiPropModal {
  show: boolean;
  handleClose: () => void;
  handleShow?: () => void;
  id?: number | null;
}

export const ModalMsgDocente = ({ id, show, handleClose, handleShow }: DocentiPropModal) => {
  const loginToken = useAppSelector((state) => state.profile?.token);
  const myProfile = useAppSelector((state) => state.myProfile);
  const [mesg, setMsg] = useState({ messaggio: { msg: "", data: new Date() } as IMessage, status: "idle" });

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

  const fetchDelete = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_APIURL + "/msgs/id/" + id, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + loginToken.accessToken },
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

  const initModal = async () => {
    if (id != null && id !== undefined) {
      await fetchMessaggio();
      setMsg({ ...mesg, messaggio: { ...mesg.messaggio, docente: { ...myProfile.myProfile } } });
    } else {
      setMsg({ messaggio: { msg: "", data: new Date(), docente: { ...myProfile.myProfile } } as IMessage, status: "idle" });
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

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg({ ...mesg, messaggio: { ...mesg.messaggio, msg: e.target.value } });
  };
  const handleData = (e: React.ChangeEvent<HTMLDataElement>) => {
    setMsg({ ...mesg, messaggio: { ...mesg.messaggio, data: format(new Date(e.target.value), "yyyy-MM-dd") } });
  };

  const handleCorso = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMsg({ ...mesg, messaggio: { ...mesg.messaggio, corso: myProfile.myProfile?.corsi?.find((el) => el.id + "" === e.target.value) } });
  };

  const handleDelete = () => {
    fetchDelete();
    handleClose();
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
                  <label htmlFor="corso">Corso: </label>
                  <select id="corso" onChange={handleCorso}>
                    <option value={0}>Seleziona un corso</option>
                    {myProfile.myProfile?.corsi?.map((el) => (
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
            <div>
              <span onClick={handleDelete}>Elimina</span>
            </div>
            <div>
              <Button variant="secondary" onClick={handleClose}>
                Chiudi
              </Button>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Salva
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
