import useDocumentTitle from "../../app/useDocumentTitle";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { Button, Form, Col, Row, Alert } from "react-bootstrap";
import ReCaptcha from "@matt-block/react-recaptcha-v2";
import "./Contattaci.scss";
import { IProfile } from "../../app/reducers/profileSlice";

export const Contattaci = () => {
  useDocumentTitle("Contattaci");

  const initialStateForm = { firstname: "", lastname: "", email: "", subject: "", message: "", gpdrconsent: false };

  const myProfile = useAppSelector((state) => state.myProfile as { myProfile: IProfile; status: string });
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ ...initialStateForm });
  const [showSent, setShowSent] = useState(false);
  const [captchaState, setCaptchaState] = useState("none");

  useEffect(() => {
    if (!myProfile.myProfile?.id) {
      navigate("/");
    }
  }, [myProfile]);

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
      <Col lg={6}>
        <h2 className="my-3">Contact me</h2>
        <Form className="d-flex flex-wrap" onSubmit={handleSubmit}>
          <Col xs={12} md={6} className="mb-3">
            <label className="form-label" htmlFor="firstname">
              First Name
            </label>
            <input className="form-control" type="text" id="firstname" onChange={handleChange} value={formState.firstname} />
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <label className="form-label" htmlFor="lastname">
              Last Name
            </label>
            <input className="form-control" type="text" id="lastname" value={formState.lastname} onChange={handleChange} />
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input className="form-control" type="email" id="email" value={formState.email} onChange={handleChange} />
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <label className="form-label" htmlFor="subject">
              Subject
            </label>
            <select className="form-control" id="subject" value={formState.subject} onChange={handleSelect}>
              <option>Subject no. One</option>
              <option>Subject no. Two</option>
              <option>Subject no. Three</option>
            </select>
          </Col>
          <Col xs={12} className="mb-3">
            <label className="form-label" htmlFor="message">
              Message
            </label>
            <textarea className="form-control" id="message" onChange={handleText} value={formState.message} />
          </Col>
          <Col xs={12} className="mb-3">
            <input type="checkbox" id="gpdrconsent" required checked={formState.gpdrconsent} onChange={handleConsent} />
            <label className="form-label" htmlFor="gpdrconsent">
              GPDR Consent Checkbox
            </label>
          </Col>
          <Col xs={12} className="mb-3">
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
          <Button className="btn btn-primary" type="submit">
            Send
          </Button>
        </Form>
        {showSent && (
          <Alert variant={"success"} className="mt-3">
            Your message was sent!
          </Alert>
        )}
        {captchaState == "expired" && <Alert className="mt-3">Captcha verification expired!</Alert>}
        {captchaState == "error" && <Alert className="mt-3">Invalid captcha verification!</Alert>}
      </Col>
    </Row>
  );
};
