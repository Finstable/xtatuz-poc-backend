import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/shared/dto/base.dto';

export class QueryFilterTokens extends BaseQueryDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsOptional()
  token_address: string;
}
