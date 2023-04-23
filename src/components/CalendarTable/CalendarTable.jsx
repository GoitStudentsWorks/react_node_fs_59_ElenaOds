import { useEffect, useState } from 'react';
import styles from './CalendarTable.module.css';
import { createCalendarDays } from './createCalendarDays';
import { daysList, nextMonth } from './getDays';
import { splitIntoWeeks } from './splitWeeks';
const { getDate, format, addMonths } = require("date-fns");






export default function CalendarTable() {
  const [weeksList, setWeeksList] = useState([]);
  const [month, setMonth] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  useEffect(() => {
    const days = month === 0 ? daysList : nextMonth(month);
    console.log('days: ', days);
    const calendarDays = createCalendarDays(days);
    const weeksList = splitIntoWeeks(calendarDays);
    setWeeksList(weeksList);
  }, [month]);
  
  
  const handleLeftClick = () => {
    setCurrentDate((prevMonth) => addMonths(prevMonth, -1));
    setMonth(month - 1)
    
  }
  const handleRightClick = () => {
    setCurrentDate((prevMonth) => addMonths(prevMonth, +1));

    setMonth(month + 1)
    
  }
  return (
    <div className = {styles.container}>
    <div className={styles.Month}>
      <h1 className={styles.Month_name}>{format(currentDate, 'LLLL yyyy')}</h1>
      <button type='button' className = {styles.Month_buttons} onClick ={handleLeftClick} >left</button>
      <button type='button' className = {styles.Month_buttons} onClick ={handleRightClick}>rigth</button>
    </div>
    <div className = {styles.Days}>
      <p className = {styles.Days_text}>Mon</p>
      <p className = {styles.Days_text}>Tue</p>
      <p className = {styles.Days_text}>Wed</p>
      <p className = {styles.Days_text}>Thu</p>
      <p className = {styles.Days_text}>Fri</p>
      <p className = {styles.Days_text}>Sat</p>
      <p className = {styles.Days_text}>Sun</p>
    </div>
    <div className={styles.datesInCalendar}>
        {weeksList.map((week) => {
          return (
            <div key={week} className={styles.Week}>
              {week.map((day) => { //! add a key
                return (
                  <div className={styles.OneDay}>  
                    {day ? <p className={styles.datesInCalendar_date}>{getDate(day)}</p> : null} 
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
   
  );
}
