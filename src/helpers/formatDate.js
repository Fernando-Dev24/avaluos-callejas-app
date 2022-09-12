/* helpers */
import { fromUnixTime, format } from "date-fns";
import spanishLocale from 'date-fns/locale/es';

const formatDate = (date) => {
   const unixTime = fromUnixTime(date);
   const formatDate = format(unixTime, 'dd/MM/yyyy h:mm aa');
   return formatDate;
};

const formatWithoutTime = (date = new Date()) => {
   const unixTime = fromUnixTime(date);
   const formatDate = format(unixTime, 'dd/MM/yyyy');
   return formatDate;
};

const formatMonth = (date = new Date()) => {
   const objectDate = fromUnixTime(date);
   return format(objectDate, 'MMMM/yyyy', { locale: spanishLocale });
};

const formatDateId = (date = new Date()) => {
   return format(fromUnixTime(date), `hMMddtyyyy`);
}

const getAvaluoMonth = (date = new Date()) => {
   return Number(format(fromUnixTime(date), 'M'));
};

const getAvaluoDay = (date = new Date()) => {
   return Number(format(fromUnixTime(date), 'd'));
};

export {
   formatDate,
   formatWithoutTime,
   formatDateId,
   getAvaluoMonth,
   getAvaluoDay,
   formatMonth
};