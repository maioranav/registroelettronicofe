import { Col, Spinner } from "react-bootstrap";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { myTokenFetch } from "../../app/reducers/loginSlice";
import { LoginError } from "./LoginError/LoginError";
import { myProfileFetch } from "../../app/reducers/profileSlice";
import useDocumentTitle from "../../app/useDocumentTitle";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const Login = () => {
  useDocumentTitle("Login");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginToken = useAppSelector((state) => state.profile);
  const myProfile = useAppSelector((state) => state.myProfile);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await dispatch(myTokenFetch({ username, password }));
  };

  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const passHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (loginToken.token?.accessToken != "") {
      dispatch(myProfileFetch(loginToken.token?.accessToken));
    }
  }, [loginToken.token?.accessToken]);

  useEffect(() => {
    if (myProfile.myProfile?.id) {
      if (loginToken.token.role?.filter((el) => el.roleName.includes("ROLE_ADMIN")).length > 0) {
        navigate("/segreteria");
      } else if (loginToken.token.userType === "Studente") {
        navigate("/dashstudente");
      } else if (loginToken.token.userType === "Docente") {
        navigate("/dashdocente");
      } else {
        navigate("/needactivation");
      }
    }
  }, [myProfile]);

  return (
    <Col md={6} sm={12} className="loginMain d-flex flex-column justify-content-center align-items-center">
      <LazyLoadImage src="./logo192.png" alt="Logo" effect="blur" width={"100px"} height={"100px"}></LazyLoadImage>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleLogin}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Accedi</h3>
            <div className="form-group mt-3">
              <label>Nome Utente</label>
              <input type="text" className="form-control mt-1" placeholder="Inserisci username" value={username} onChange={usernameHandler} />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input type="password" className="form-control mt-1" placeholder="Inserisci password" value={password} onChange={passHandler} />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary loginButton">
                Accedi
              </button>
              {loginToken.status === "loading" && <Spinner animation="border" variant="primary" />}
              {loginToken.status === "failed" && <LoginError />}
            </div>
            <p className="text-center mt-2">
              <Link to="/recover">Hai dimenticato la password?</Link>
            </p>
          </div>
        </form>
      </div>
      <Link to="/">Torna alla home page</Link>
    </Col>
  );
};
