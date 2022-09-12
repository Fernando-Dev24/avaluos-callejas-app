/* firebase */
import { db } from '../firebase/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
/* helpers */
import numbro from 'numbro';

export const addBase = async (setTargetAvaluo, targetAvaluo, base) => {
   
   // Desestructuring id of the selected avaluo
   const { id, totalExpenses } = targetAvaluo.content;
   let expenses = numbro.unformat(totalExpenses);
   let commercialPrice;
   let agencyPrice;
   let expensesPercentage = 0;

   // Calculate the expenses percentage to know how many expenses the car has.
   expensesPercentage = Math.floor(( expenses / base ) * 100);

   // Make conditionals to know the exact value and if it is a max value doc or not.
   if( expensesPercentage <= 54 ) { // When expenses are less than 54%
      commercialPrice = Math.round(base - expenses);
      agencyPrice = Math.round(( base - expenses ) / 1.23);
   } else if ( expensesPercentage >= 55 && expensesPercentage <= 75 ) { // When expenses are more than 55 and less than 75
      commercialPrice = Math.round(base * 0.40);
      agencyPrice = Math.round(( base * 0.40 ) / 1.23);
   } else if ( expensesPercentage >= 76 && expensesPercentage <= 100 ) { // When expenses are more than 76 and less than 100
      commercialPrice = Math.round(base * 0.30);
      agencyPrice = Math.round(( base * 0.30 ) / 1.23);
   } else if ( expensesPercentage > 100 ) {
      commercialPrice = Math.round(base * 0.25);
      agencyPrice = Math.round(( base * 0.25 ) / 1.23);
   };

   // Creating a new avaluo object with base fields include
   const avaluoWithBase = {
      ...targetAvaluo.content,
      expensesPercentage: expensesPercentage,
      commercialPrice: numbro(commercialPrice).formatCurrency({ thousandSeparated: true, mantissa: 2 }),
      agencyPrice: numbro(agencyPrice).formatCurrency({ thousandSeparated: true, mantissa: 2 }),
      state: "FINALIZADO",
      base: base
   };

   await updateDoc(doc(db, 'avaluos', id), avaluoWithBase);
   setTargetAvaluo({
      isSomething: true,
      content: avaluoWithBase,
   });
};