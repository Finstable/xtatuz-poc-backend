import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  PropertyCompletion,
  PropertyStatus,
  PropertyType,
} from 'src/shared/enum/types';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
  @IsString()
  @IsOptional()
  company_name: string;

  @IsString()
  @IsOptional()
  issuer_name: string;

  @IsString()
  @IsOptional()
  mobile_number: string;

  @IsString()
  @IsOptional()
  email_address: string;

  @IsString()
  @IsOptional()
  lot_size: string;

  @IsString()
  @IsOptional()
  interior_size: string;

  @IsString()
  @IsOptional()
  property_name: string;

  @IsString()
  @IsOptional()
  user_id: string;

  @IsArray()
  @IsOptional()
  img: string[];

  @IsNumber()
  @IsOptional()
  expect_income: number;

  @IsString()
  @IsOptional()
  underlying_asset: string;

  @IsOptional()
  financial: Financial;

  @IsString()
  @IsOptional()
  status: PropertyStatus;

  @IsNumber()
  @IsOptional()
  total_raise: number;

  @IsNumber()
  @IsOptional()
  total_investment: number;

  @IsOptional()
  start_presale: Date;

  @IsOptional()
  end_presale: Date;

  @IsNumber()
  @IsOptional()
  total_supply: number;

  @IsString()
  @IsOptional()
  link_doc: string;

  @IsString()
  @IsOptional()
  detail: string;

  @IsString()
  @IsOptional()
  location_link: string;

  @IsOptional()
  near_location: NearLocation[];

  @IsString()
  @IsOptional()
  onchain_id: string;

  @IsString()
  @IsOptional()
  note: string;

  @IsString()
  @IsOptional()
  address_property: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  property_type: PropertyType;

  @IsString()
  @IsOptional()
  property_completion_status: PropertyCompletion;

  @IsNumber()
  @IsOptional()
  token_price: number;

  @IsOptional()
  property_features: PropertyFeatures[];

  @IsNumber()
  @IsOptional()
  token_id: number;
}

interface PropertyFeatures {
  id: number;
  key: string;
  value: string;
  unit: string;
}
interface NearLocation {
  id: number;
  location_name: string;
  description: string;
  distance: GLfloat;
}

interface Financial {
  id: number;
  gross_rent_per_year: number;
  gross_rent_per_month: number;
  monthly_costs: number;
  net_rent_per_year: number;
  net_rent_per_month: number;
  total_price: number;
  expected_income: number;
}

export class EventLogDto {
  @IsOptional()
  @IsString()
  ownerAddress: string;
}

export class HistoryEventLogDto {
  @IsOptional()
  ownerAddress: string;

  @IsOptional()
  fromBlock: number;

  @IsOptional()
  toBlock: number;
}

export class UpdateStatusDTO {
  @IsString()
  @IsNotEmpty()
  status: string;
}
