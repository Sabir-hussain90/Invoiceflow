import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreatePurchaseItemDto {
  @IsString()
  productId: string;

  @IsNumber()
  @Min(0.001)
  quantity: number;

  @IsNumber()
  @Min(0)
  unitCost: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  discountAmount?: number;
}