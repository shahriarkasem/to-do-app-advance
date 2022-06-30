import React, { useState } from "react";
import CalendarMap from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [value, onChange] = useState(new Date());
  return (
    <section className="flex justify-center mt-10 md:mt-20">
       <div>
      <CalendarMap onChange={onChange} value={value} />
    </div>
    </section>
  );
};

export default Calendar;
