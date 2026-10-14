import { IsOptional, IsString } from 'class-validator';

export class InvoiceQueryDto {
  @IsOptional()
  @IsString()
  saleId?: string;
}