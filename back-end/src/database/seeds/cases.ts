const caseData = [
  {
    customerName: 'first',
    startDate: new Date('2023-01-01'),
    isFinished: false,
  },
  {
    customerName: 'second',
    startDate: new Date('2023-02-01'),
    isFinished: true,
  },
  {
    customerName: 'third',
    startDate: new Date('2023-03-01'),
    isFinished: false,
  },
  {
    customerName: 'forth',
    startDate: new Date('2023-04-01'),
    isFinished: true,
  },
  {
    customerName: 'fifth',
    startDate: new Date('2023-05-01'),
    isFinished: false,
  },
];

const generateFxFileId = (customerName: string): string => {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const randomChars = Math.random().toString(36).substring(2, 6);
  return `${customerName}-${currentYear}-${randomChars}`;
};

export const seed = async (knex: any) => {
  await knex('cases').del();

  for (const caseItem of caseData) {
    const fxFileId = generateFxFileId(caseItem.customerName);
    await knex('cases').insert({
      ...caseItem,
      fxFileId,
    });
  }
};
