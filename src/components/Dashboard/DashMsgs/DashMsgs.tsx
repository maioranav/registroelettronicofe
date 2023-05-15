import "./DashMsgs.scss";
import { IoIosArrowForward } from "react-icons/io";
import { HiBellAlert } from "react-icons/hi2";
import { FcInvite } from "react-icons/fc";
import { BsPlusCircleFill } from "react-icons/bs";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { messagesFetch } from "../../../app/reducers/messageSlice";

interface IDashProps {
  variante: string;
}

export const DashMsgs = ({ variante }: IDashProps) => {
  const dispatch = useAppDispatch();
  const loginToken = useAppSelector((state) => state.profile.token.accessToken);
  const myProfile = useAppSelector((state) => state.myProfile?.myProfile);
  const msgs = useAppSelector((state) => state.msgs.messages?.content);

  useEffect(() => {
    dispatch(messagesFetch({ accessToken: loginToken, elNo: 4, sort: "data,desc" }));
    //qualcosaqui
  }, [myProfile]);

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
        {msgs?.length > 0 &&
          msgs.map((el) => (
            <li key={el.id} className="mb-3">
              <div className="d-flex justify-content-center">
                <FcInvite className="iconaMessaggio" />
              </div>
              <div>
                <p>{el.corso.name}</p>
                <p>{el.msg.substring(0, 40) + "..."}</p>
                <p>{el.data.toString()}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
