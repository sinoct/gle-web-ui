export const toBase64 = (file: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || "");
    reader.onerror = reject;
  });
};

export const toStringFromBase64 = (base64String: string) => {
  const string = Buffer.from(base64String, "base64").toString();
  return string;
};
