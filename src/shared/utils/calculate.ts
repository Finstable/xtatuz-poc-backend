import { parseUnits } from 'ethers';

export const amount = (tokenAmount: string, decimal: number) => {
  const amount = parseUnits(tokenAmount, decimal);

  return amount;
};

export const dateToTimestamp = (date: Date) => {
  return Math.floor(date.getTime() / 1000);
};
