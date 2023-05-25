import { Button, Col, Container, Row } from "react-bootstrap";
import { CustomNav } from "../CustomNav/CustomNav";
import "./EditProfilo.scss";
import { useAppSelector } from "../../app/hooks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
export const EditProfilo = () => {
  const myProfile = useAppSelector((state) => state.myProfile);
  const navigate = useNavigate();
  return (
    <>
      <Row>
        <CustomNav />
        <Col xs={12} md={9} lg={10}>
          <Container className="py-5">
            <div className="profileEdit">
              <div className="profileTitle">Edita Profilo</div>
              <div>
                <img src="../../../imgs/avatar.svg" alt="Profile Avatar" className="rounded-circle" />
              </div>
              <div>
                <div className="my-3">
                  <b className="mx-2">Nome:</b>
                  {myProfile.myProfile.name + " " + myProfile.myProfile.surname}
                </div>
                <div className="my-3">
                  <b className="mx-2">Email:</b>
                  {myProfile.myProfile.email}
                </div>
                <div className="my-3">
                  <b className="mx-2">Username:</b>
                  {myProfile.myProfile.username}
                </div>
                <div className="my-3">
                  <b className="mx-2">Password:</b> <input type="password" id="password" />
                  <Button variant="primary" className="text-light rounded-pill mx-2">
                    Salva
                  </Button>
                </div>
                <div className="my-5">
                  <Button variant="danger" onClick={() => navigate("/logout")}>
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Col>
      </Row>
    </>
  );
};
