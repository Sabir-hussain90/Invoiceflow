import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePurchaseItemDto } from './create-purchase-item.dto';

export class CreatePurchaseDto {
  @IsString()
  supplierId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseItemDto)
  items: CreatePurchaseItemDto[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  discountAmount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  taxAmount?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsEnum([
    'CASH',
    'BANK_TRANSFER',
    'DIGITAL_WALLET',
    'CARD',
    'CREDIT',
    'SPLIT',
    'OTHER',
  ])
  paymentMethod:
    | 'CASH'
    | 'BANK_TRANSFER'
    | 'DIGITAL_WALLET'
    | 'CARD'
    | 'CREDIT'
    | 'SPLIT'
    | 'OTHER';

  // Amount actually paid to the supplier at the time of purchase
  @IsNumber()
  @Min(0)
  amountPaid: number;
}