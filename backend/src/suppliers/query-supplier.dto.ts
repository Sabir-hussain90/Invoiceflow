import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class QuerySupplierDto {
  @IsOptional()
  @IsString()
  search?: string;

  // Pass "true" to fetch only suppliers with totalOwed > 0
  @IsOptional()
  @IsBooleanString()
  withBalance?: string;
}