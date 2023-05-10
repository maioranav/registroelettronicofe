import { Col, Spinner } from "react-bootstrap";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IToken, myTokenFetch } from "../../app/reducers/loginSlice";
import { LoginError } from "./LoginError/LoginError";
import { IProfile, myProfileFetch } from "../../app/reducers/profileSlice";
import useDocumentTitle from "../../app/useDocumentTitle";

export const Login = () => {
  useDocumentTitle("UniVincenzo Login");

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const loginToken = useAppSelector((state) => state.profile as { token: IToken; status: string });
  const myProfile = useAppSelector((state) => state.myProfile as { myProfile: IProfile; status: string });
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

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
    <Col md={6} sm={12} className="loginMain">
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleLogin}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input type="text" className="form-control mt-1" placeholder="Enter username" value={username} onChange={usernameHandler} />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input type="password" className="form-control mt-1" placeholder="Enter password" value={password} onChange={passHandler} />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              {loginToken.status == "loading" && <Spinner animation="border" variant="primary" />}
              {loginToken.status == "idle" && !loginToken.token && <LoginError />}
            </div>
            <p className="text-center mt-2">
              Forgot <Link to="/">password?</Link>
            </p>
          </div>
        </form>
      </div>
    </Col>
  );
};
