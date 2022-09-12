/* helpers */
import numbro from "numbro";

export const editExpense = (newAvaluo, setNewAvaluo, expenseToEdit) => {
   // Destructuring values from expenseToEdit
   const { description, price, id } = expenseToEdit.content;
   const { expenses } = newAvaluo;

   // Creating the new object to remove the old one and push this one
   const newEditedExpense = {
      id: id,
      description: description,
      price: numbro(price).formatCurrency({ thousandSeparated: true, mantissa: 2 }),
   };

   // Find the index on expenses array from the older array item
   const targetIndex = expenses.findIndex(({ id }) => id === expenseToEdit.content.id);
   targetIndex !== -1 ? expenses[targetIndex] = newEditedExpense : console.log('Error');
   const newExpensesEdit = [...expenses];

   // Update newAvaluo context
   setNewAvaluo({
      ...newAvaluo,
      expenses: newExpensesEdit,
   });
};