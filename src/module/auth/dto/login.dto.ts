import { IsOptional } from 'class-validator';

export class LoginDto {
  @IsOptional()
  signatures: string;
}
