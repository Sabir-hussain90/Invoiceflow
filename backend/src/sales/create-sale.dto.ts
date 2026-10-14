import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSaleItemDto } from './create-sale-item.dto';

export class CreateSaleDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateSaleItemDto)
  items: CreateSaleItemDto[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  discountAmount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  discountPercent?: number;

  @IsOptional()
  @IsString()
  customerId?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsEnum([
    'CASH',
    'JAZZCASH',
    'EASYPAISA',
    'BANK_TRANSFER',
    'DIGITAL_WALLET',
    'CARD',
    'CREDIT',
    'SPLIT',
    'OTHER',
  ])
  paymentMethod:
    | 'CASH'
    | 'JAZZCASH'
    | 'EASYPAISA'
    | 'BANK_TRANSFER'
    | 'DIGITAL_WALLET'
    | 'CARD'
    | 'CREDIT'
    | 'SPLIT'
    | 'OTHER';

  @IsNumber()
  @Min(0)
  amountReceived: number;
}