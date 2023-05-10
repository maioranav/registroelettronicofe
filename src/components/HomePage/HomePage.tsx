import { Button, Col, Row } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./HomePage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../app/useDocumentTitle";

export const HomePage = () => {
  useDocumentTitle("UniVincenzo - Home");
  const navigate = useNavigate();
  const [shownImage, setShownImage] = useState(false);

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      <Row className="homePageRow">
        <Col xs={12} lg={6} className="leftColumn">
          <div>
            <LazyLoadImage
              src="http://p-hold.com/castle/800/800"
              alt="Random Pic"
              effect="blur"
              width={"800"}
              height={"800"}
              afterLoad={() => {
                setShownImage(true);
              }}
              className="rounded-circle homeRandomImg"
            ></LazyLoadImage>
          </div>
          {shownImage && <h6 className="text-info text-center">Random Picture from p-Hold</h6>}
        </Col>
        <Col xs={12} lg={6} className="d-flex p-5 justify-content-center rightColumn flex-column align-items-center align-items-md-start">
          <h1>UniVincenzo.it</h1>
          <h3 className="d-none d-md-block w-75">Dove Innovazione e Tecnologia, rappresentano il futuro!</h3>
          <Button className="mt-4 rounded-4" onClick={handleClick}>
            Accedi
          </Button>
        </Col>
      </Row>
    </>
  );
};
