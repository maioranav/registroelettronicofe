import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./DashCalendar.scss";
import { IoIosArrowForward } from "react-icons/io";
import { lezioniFetch } from "../../../app/reducers/lezioniSlice";
import { Corso } from "../../../app/custominterfaces";
import { format } from "date-fns";
export const DashCalendar = () => {
  const corsi = useAppSelector((state) => state.myProfile?.myProfile?.corsi);
  const loginToken = useAppSelector((state) => state.profile?.token);
  const lezioni = useAppSelector((state) => state.lezioni);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(lezioniFetch({ accessToken: loginToken.accessToken, corsi: corsi, data: format(new Date(), "yyyy-MM-dd") }));
  }, []);

  return (
    <div className="calendarioDashMobile my-4">
      <div className="nextLessons">
        {lezioni.status === "idle" &&
          lezioni.lezioni.length > 0 &&
          lezioni.lezioni.map((el) => (
            <div className="mobileCalendarNextLesson">
              <p className="m-0 text-danger">{el.data + ""}</p>
              <p className="m-0 text-primary">9:00</p>
              <p className="m-0">{el.corso.name}</p>
            </div>
          ))}
      </div>
      <h6 className="text-primary mt-2">
        Vedi tutte le lezioni <IoIosArrowForward />
      </h6>
    </div>
  );
};
