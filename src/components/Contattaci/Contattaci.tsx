import useDocumentTitle from "../../app/useDocumentTitle";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Form, Col, Row, Alert } from "react-bootstrap";
import ReCaptcha from "@matt-block/react-recaptcha-v2";
import "./Contattaci.scss";

export const Contattaci = () => {
  useDocumentTitle("Contattaci");

  const initialStateForm = { firstname: "", lastname: "", email: "", subject: "", message: "", gpdrconsent: false };

  const [formState, setFormState] = useState({ ...initialStateForm });
  const [showSent, setShowSent] = useState(false);
  const [captchaState, setCaptchaState] = useState("none");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (captchaState === "success") {
      console.log(formState);
      setFormState({ ...initialStateForm });
      setShowSent(!showSent);
    } else {
      setCaptchaState("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "firstname":
        setFormState({ ...formState, firstname: e.target.value });
        break;
      case "lastname":
        setFormState({ ...formState, lastname: e.target.value });
        break;
      case "email":
        setFormState({ ...formState, email: e.target.value });
        break;
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState({ ...formState, subject: e.target.value });
  };

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({ ...formState, message: e.target.value });
  };

  const handleConsent = () => {
    setFormState({ ...formState, gpdrconsent: !formState.gpdrconsent });
  };

  return (
    <Row className="d-flex justify-content-center" style={{ marginTop: "3rem" }}>
      <Col lg={6} className="bg-white p-5 rounded-3 shadow">
        <h2 className="my-3 px-2">Contatta la segreteria</h2>
        <Form className="d-flex flex-wrap" onSubmit={handleSubmit}>
          <Col xs={12} md={6} className="mb-3 px-2">
            <label className="form-label" htmlFor="firstname">
              Nome
            </label>
            <input className="form-control" type="text" id="firstname" onChange={handleChange} value={formState.firstname} />
          </Col>
          <Col xs={12} md={6} className="mb-3 px-2">
            <label className="form-label" htmlFor="lastname">
              Cognome
            </label>
            <input className="form-control" type="text" id="lastname" value={formState.lastname} onChange={handleChange} />
          </Col>
          <Col xs={12} md={6} className="mb-3 px-2">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input className="form-control" type="email" id="email" value={formState.email} onChange={handleChange} />
          </Col>
          <Col xs={12} md={6} className="mb-3 px-2">
            <label className="form-label" htmlFor="subject">
              Oggetto
            </label>
            <select className="form-control" id="subject" value={formState.subject} onChange={handleSelect}>
              <option>Informazioni Generali</option>
              <option>Informazioni sulle Lezioni</option>
              <option>Ho perso la password</option>
            </select>
          </Col>
          <Col xs={12} className="mb-3 px-2">
            <label className="form-label" htmlFor="message">
              Messaggio
            </label>
            <textarea className="form-control" id="message" onChange={handleText} value={formState.message} />
          </Col>
          <Col xs={12} className="mb-3 px-2">
            <input type="checkbox" id="gpdrconsent" required checked={formState.gpdrconsent} onChange={handleConsent} />
            <label className="form-label" htmlFor="gpdrconsent">
              GPDR Consent Checkbox
            </label>
          </Col>
          <Col xs={12} className="mb-3 px-2">
            <ReCaptcha
              siteKey={process.env.REACT_APP_GOOGLE_SITEKEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
              theme="light"
              size="normal"
              onSuccess={() => {
                setCaptchaState("success");
              }}
              onError={() => {
                setCaptchaState("error");
              }}
              onExpire={() => {
                setCaptchaState("expired");
              }}
            />
          </Col>
          <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
            <div className="d-flex">
              <Button className="btn-primary mx-2" type="submit">
                Invia
              </Button>
              <Button className="btn-warning mx-2" type="reset">
                Reset
              </Button>
            </div>
            <Link className="m-2 m-md-0" to="/">
              Torna alla HomePage
            </Link>
          </div>
        </Form>
        {showSent && (
          <Alert variant={"success"} className="mt-3">
            Il tuo messaggio è stato inviato!
          </Alert>
        )}
        {captchaState == "expired" && (
          <Alert variant={"danger"} className="mt-3">
            La sessione reCaptcha è scaduta!
          </Alert>
        )}
        {captchaState == "error" && (
          <Alert variant={"danger"} className="mt-3">
            Verifica reCaptcha non riuscita!
          </Alert>
        )}
      </Col>
    </Row>
  );
};
