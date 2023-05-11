import { Link } from "react-router-dom";
import "./NotFound.scss";
import useDocumentTitle from "../../app/useDocumentTitle";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const NotFound = () => {
  useDocumentTitle("Error Page");
  return (
    <div className="page-wrap d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center col404">
            <LazyLoadImage src="./logo192.png" alt="Logo" effect="blur" width={"100px"} height={"100px"}></LazyLoadImage>
            <span className="display-1 d-block">404</span>
            <div className="mb-4 lead">Abbiamo cercato ovunque, ma la pagine che cerchi non si trova...</div>
            <Link to="/" className="btn btn-link">
              Torna alla HomePage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
