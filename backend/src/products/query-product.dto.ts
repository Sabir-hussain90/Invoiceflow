import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class QueryProductDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  // Passed as "true" or "false" from query string
  @IsOptional()
  @IsBooleanString()
  lowStock?: string;

  @IsOptional()
  @IsBooleanString()
  activeOnly?: string;
}