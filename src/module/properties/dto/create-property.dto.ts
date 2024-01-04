import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { PropertyStatus } from 'src/shared/enum/types';

export class CreatePropertyDto {
  @IsString()
  @IsOptional()
  property_name: string;

  @IsString()
  @IsOptional()
  user_id: string;

  @IsArray()
  @IsOptional()
  img: string[];

  @IsString()
  @IsOptional()
  issuer: string;

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

  @IsOptional()
  start_presale: Date;

  @IsNumber()
  @IsOptional()
  total_supply: number;

  @IsString()
  @IsOptional()
  link_doc: string;

  @IsString()
  @IsOptional()
  detail: string;

  @IsOptional()
  longitude: number;

  @IsOptional()
  latitude: number;

  @IsString()
  @IsOptional()
  location_name: string;

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

  @IsNumber()
  @IsOptional()
  token_price: number;

  @IsString()
  @IsOptional()
  category: string;

  @IsOptional()
  property_features: PropertyFeatures[];

  @IsString()
  @IsOptional()
  token_address: string;
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
