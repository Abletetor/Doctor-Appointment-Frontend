const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const slotDateFormat = (slotDate) => {
   const dateArray = slotDate.split('-');
   return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
};