"use server";

// Todes les funcions que s'exporten en a quest archiu pertanyen al servidor


export async function createArticles(formData: FormData) {
    const rowFormData: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      rowFormData[key] = value as string;
    });
  
    console.log(rowFormData);

  // Rest of your code...
}
