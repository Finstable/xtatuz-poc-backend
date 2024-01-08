import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/shared/dto/base.dto';
import {
  PropertyConstructStatus,
  PropertyStatus,
  PropertyType,
} from 'src/shared/enum/types';

export class QueryFilterProperty extends BaseQueryDto {
  @IsNumber()
  @IsOptional()
  user_id: number;

  @IsString()
  @IsOptional()
  property_construct_status: PropertyConstructStatus;

  @IsString()
  @IsOptional()
  type: PropertyType;

  @IsString()
  @IsOptional()
  status: PropertyStatus;
}
