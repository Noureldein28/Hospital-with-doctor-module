import { jwtDecode } from "jwt-decode";
import { getAuth } from "../helper";

const Decode_Token=() => {
   const token =getAuth();
        let UserData=""
        try {
          UserData = jwtDecode(token.data);
        } catch (error) {
          console.log(error);
        }
        return UserData;
}
export default Decode_Token;

export function formatDate2(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}
export function getNextDateForDay(dayName) {
  const dayMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  
  const normalizedDay = dayName.trim();
  const targetDay = dayMap[normalizedDay];
  if (targetDay === undefined) return null;
  
  const today = new Date();
  const todayDay = today.getDay();
  
  const daysToAdd = (targetDay - todayDay + 7) % 7 || 7;
  
  const nextDate = new Date();
  nextDate.setDate(today.getDate() + daysToAdd);
  return nextDate;
}
export const hasDatePassed = (dateStr) => {
  const [day, month, year] = dateStr.split("-").map(Number);
  const inputDate = new Date(year, month - 1, day); 
  const today = new Date();
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return inputDate < today;
};
export const calculateAge = (birthdateStr) => {
  const today = new Date();
  const birthdate = new Date(birthdateStr);

  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();
  const dayDiff = today.getDate() - birthdate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};
