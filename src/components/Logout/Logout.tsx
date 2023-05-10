import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { cleanToken } from "../../app/reducers/loginSlice";
import "./Logout.scss";
import { cleanProfile } from "../../app/reducers/profileSlice";

export const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch(cleanToken());
    await dispatch(cleanProfile());
  };

  useEffect(() => {
    logout();
    navigate("/");
  }, []);

  return (
    <div id="logout" className="d-flex justify-content-center align-items-center">
      <Spinner id="logout-spin" animation="border" variant="primary" />
      Loggin out...
    </div>
  );
};
