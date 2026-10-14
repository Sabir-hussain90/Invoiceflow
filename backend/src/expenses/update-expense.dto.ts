import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateExpenseDto {
  @IsOptional()
  @IsEnum([
    'ELECTRICITY',
    'RENT',
    'WAGES',
    'TRANSPORT',
    'PACKAGING',
    'REPAIRS',
    'INTERNET',
    'WATER',
    'GAS',
    'OFFICE',
    'MARKETING',
    'OTHER',
  ])
  category?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  amount?: number;

  @IsOptional()
  @IsEnum([
    'CASH',
    'BANK_TRANSFER',
    'DIGITAL_WALLET',
    'CARD',
    'OTHER',
  ])
  paymentMethod?: string;

  @IsOptional()
  @IsString()
  expenseDate?: string;

  @IsOptional()
  @IsString()
  receiptUrl?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}