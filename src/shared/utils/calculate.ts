import { parseUnits } from 'ethers';
import * as dayjs from 'dayjs';

export const amount = (tokenAmount: string, decimal: number) => {
  const amount = parseUnits(tokenAmount, decimal);

  return amount;
};

export const dateToTimestamp = (date: Date) => {
  const timestamp = dayjs(date).unix();
  return timestamp;
};
