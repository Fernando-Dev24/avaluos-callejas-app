export const downloadImage = async (url, filename) => {
   // We need to create a link to automatically click on it and then delete from DOM
   const response = await fetch(url, { mode: 'no-cors' });
   const imageResponse = await response.blob();
   const imageURL = URL.createObjectURL(imageResponse);

   const link = document.createElement("a");
   link.href = imageURL;
   link.download = filename;
   document.body.append(link);
   link.click();
   document.body.remove(link);
};