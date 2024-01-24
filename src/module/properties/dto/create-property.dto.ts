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

export class CreatePropertyDto {
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
  @IsNotEmpty()
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
  @IsNotEmpty()
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
  @IsNotEmpty()
  total_supply: number;

  @IsString()
  @IsOptional()
  link_doc: string;

  @IsString()
  @IsOptional()
  detail: string;

  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  token_price: number;

  @IsNotEmpty()
  property_features: PropertyFeatures[];

  @IsString()
  @IsNotEmpty()
  token_id: number;
}

interface PropertyFeatures {
  key: string;
  value: string;
  unit: string;
}
interface NearLocation {
  location_name: string;
  description: string;
  distance: GLfloat;
}

interface Financial {
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
