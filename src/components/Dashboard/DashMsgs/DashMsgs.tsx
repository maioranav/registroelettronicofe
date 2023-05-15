import "./DashMsgs.scss";
import { IoIosArrowForward } from "react-icons/io";
import { HiBellAlert } from "react-icons/hi2";
import { FcInvite } from "react-icons/fc";
import { BsPlusCircleFill } from "react-icons/bs";

interface IDashProps {
  variante: string;
}

export const DashMsgs = ({ variante }: IDashProps) => {
  return (
    <div className="circolariCorsiMobile">
      <h5>
        Circolari dei tuoi corsi
        <span className="text-primary">
          {variante === "studente" && <HiBellAlert />}
          {variante === "docente" && <BsPlusCircleFill />}
          <IoIosArrowForward />
        </span>
      </h5>
      <ul>
        <li className="mb-3">
          <div className="d-flex justify-content-center">
            <FcInvite className="iconaMessaggio" />
          </div>
          <div>
            <p>CORSO NOME</p>
            <p>Inizia qui il testo del discorso e </p>
            <p>Data per esteso</p>
          </div>
        </li>
        <li className="mb-3">
          <div className="d-flex justify-content-center">
            <FcInvite className="iconaMessaggio" />
          </div>
          <div>
            <p>CORSO NOME</p>
            <p>Inizia qui il testo del discorso e </p>
            <p>Data per esteso</p>
          </div>
        </li>
        <li className="mb-3">
          <div className="d-flex justify-content-center">
            <FcInvite className="iconaMessaggio" />
          </div>
          <div>
            <p>CORSO NOME</p>
            <p>Inizia qui il testo del discorso e </p>
            <p>Data per esteso</p>
          </div>
        </li>
        <li className="mb-3">
          <div className="d-flex justify-content-center">
            <FcInvite className="iconaMessaggio" />
          </div>
          <div>
            <p>CORSO NOME</p>
            <p>Inizia qui il testo del discorso e </p>
            <p>Data per esteso</p>
          </div>
        </li>
      </ul>
    </div>
  );
};
