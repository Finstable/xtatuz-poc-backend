import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/shared/dto/base.dto';
import {
  PropertyCompletion,
  PropertyStatus,
  PropertyType,
} from 'src/shared/enum/types';

export class QueryFilterProperty extends BaseQueryDto {
  @IsNumber()
  @IsOptional()
  user_id: number;

  @IsString()
  @IsOptional()
  property_completion_status: PropertyCompletion;

  @IsString()
  @IsOptional()
  property_type: PropertyType;

  @IsString()
  @IsOptional()
  property_status: PropertyStatus;
}
