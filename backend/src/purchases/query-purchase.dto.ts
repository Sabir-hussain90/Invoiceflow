import { IsOptional, IsString } from 'class-validator';

export class QueryPurchaseDto {
  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;

  @IsOptional()
  @IsString()
  supplierId?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  purchaseNumber?: string;

  @IsOptional()
  @IsString()
  limit?: string;
}