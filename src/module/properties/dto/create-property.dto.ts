import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePropertyDto {}
export class EventLogDto {
  @IsOptional()
  @IsString()
  merchantAddress: string;
}

export class HistoryEventLogDto {
  @IsOptional()
  merchantAddress: string;

  @IsOptional()
  fromBlock: number;

  @IsOptional()
  toBlock: number;
}
