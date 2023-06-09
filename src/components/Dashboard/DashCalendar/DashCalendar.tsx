import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./DashCalendar.scss";
import { IoIosArrowForward } from "react-icons/io";
import { lezioniFetch, lezioniFetchData } from "../../../app/reducers/lezioniSlice";
import { format } from "date-fns";
import { Link, useLocation } from "react-router-dom";
export const DashCalendar = () => {
  const corsi = useAppSelector((state) => state.myProfile?.myProfile?.corsi);
  const loginToken = useAppSelector((state) => state.profile?.token);
  const lezioni = useAppSelector((state) => state.lezioni);
  const dispatch = useAppDispatch();
  const location = useLocation();
  let width = window.innerWidth;
  const [maxShow, setMaxShow] = useState(2);

  useEffect(() => {
    if (location.pathname !== "/segreteria") {
      dispatch(lezioniFetch({ accessToken: loginToken.accessToken, corsi: corsi, data: format(new Date(), "yyyy-MM-dd") }));
    } else {
      dispatch(lezioniFetchData({ accessToken: loginToken.accessToken, data: format(new Date(), "yyyy-MM-dd") }));
    }
  }, []);

  useEffect(() => {
    if (width > 768) {
      setMaxShow(4);
    }
    if (width > 1200) {
      setMaxShow(5);
    }
  }, [width]);

  return (
    <div className="calendarioDashMobile my-4">
      <div className="nextLessons">
        {lezioni.status === "idle" &&
          lezioni.lezioni?.length > 0 &&
          lezioni.lezioni
            .filter((item, index) => index < maxShow)
            .map((el) => (
              <div key={el.id} className="mobileCalendarNextLesson">
                <p className="m-0 text-danger">{el.data + ""}</p>
                <p className="m-0 text-primary">{el.orario}:00</p>
                <p className="m-0">{el.corso.name}</p>
              </div>
            ))}
      </div>
      <h6 className="text-primary mt-2">
        <Link to="/lezioni">
          Vedi tutte le lezioni <IoIosArrowForward />
        </Link>
      </h6>
    </div>
  );
};
