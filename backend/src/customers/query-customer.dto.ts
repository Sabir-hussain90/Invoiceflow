import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class QueryCustomerDto {
  @IsOptional()
  @IsString()
  search?: string;

  // Pass "true" to fetch only customers with totalOwed > 0
  @IsOptional()
  @IsBooleanString()
  withBalance?: string;
}