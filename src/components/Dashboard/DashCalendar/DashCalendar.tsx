import "./DashCalendar.scss";
import { IoIosArrowForward } from "react-icons/io";
export const DashCalendar = () => {
  return (
    <div className="calendarioDashMobile my-4">
      <div className="nextLessons">
        <div className="mobileCalendarNextLesson">
          <p className="m-0 text-danger">12 May</p>
          <p className="m-0 text-primary">9:00</p>
          <p className="m-0">Economia Aziendale</p>
        </div>
        <div className="mobileCalendarNextLesson">
          <p className="m-0 text-danger">12 May</p>
          <p className="m-0 text-primary">9:00</p>
          <p className="m-0">Economia Aziendale</p>
        </div>
      </div>
      <h6 className="text-primary mt-2">
        Vedi tutte le lezioni <IoIosArrowForward />
      </h6>
    </div>
  );
};
