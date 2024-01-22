import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/shared/dto/base.dto';

export class QueryFilterChains extends BaseQueryDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsOptional()
  chain_id: string;
}
