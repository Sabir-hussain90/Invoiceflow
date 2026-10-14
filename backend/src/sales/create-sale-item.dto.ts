import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateSaleItemDto {
  @IsString()
  productId: string;

  @IsNumber()
  @Min(0.001)
  quantity: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  discountAmount?: number;
}