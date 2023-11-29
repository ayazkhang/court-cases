export const generateFxFileId = (customerName: string): string => {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const randomChars = Math.random().toString(36).substring(2, 6);
  return `${customerName}-${currentYear}-${randomChars}`;
};

export const validateFields = (customerName: string, startDate: Date, isFinished: boolean): string | null => {
  if (!customerName || typeof customerName !== 'string' || customerName.trim() === '') {
    return "Invalid customerName. Please provide a non-empty string.";
  }

  if (typeof isFinished !== 'boolean') {
    return "Invalid isFinished. Please provide a boolean value.";
  }

  return null;
};