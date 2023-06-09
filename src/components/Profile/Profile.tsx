import "./Profile.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useAppSelector } from "../../app/hooks";
interface IProfileProps {
  variante: string;
}
export const Profile = ({ variante }: IProfileProps) => {
  const myProfile = useAppSelector((state) => state.myProfile);

  return (
    <div className="profileTop d-flex justify-content-between align-content-center my-3">
      <div className="d-flex flex-column">
        <p className="m-0 text-muted currdate">{new Date().toDateString()}</p>
        <p className="m-0 greets">Ciao, {myProfile.myProfile?.name}!</p>
      </div>
      {variante === "studente" && (
        <LazyLoadImage src="./imgs/studenteavatar.png" alt="Profile Avatar" effect="blur" width={"50px"} height={"50px"}></LazyLoadImage>
      )}
      {variante === "docente" && (
        <LazyLoadImage src="./imgs/docenteavatar.png" alt="Profile Avatar" effect="blur" width={"50px"} height={"50px"}></LazyLoadImage>
      )}
    </div>
  );
};
