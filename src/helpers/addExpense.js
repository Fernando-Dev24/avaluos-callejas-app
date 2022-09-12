/* helpers */
import numbro from "numbro";
import { v4 as uuidv4 } from 'uuid';

export const addExpense = (newAvaluo, setNewAvaluo, modalValues, targetIndex) => {
   /* Desestructuring modal values */
   const { description, price } = modalValues;
   const { expenses } = newAvaluo;

   /* Creating the object to push to expenses array on newAvaluo context */
   const newExpense = {
      id: uuidv4(),
      description: description,
      price: numbro(price).formatCurrency({ thousandSeparated: true, mantissa: 2 }),
   };

   // DONE: Push the new expense at the specific index
   let expensesBackup = [...expenses];
   expensesBackup.splice(targetIndex, 0, newExpense);

   // Update contexts
   setNewAvaluo({
      ...newAvaluo,
      expenses: [...expensesBackup],
   });
};