import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateExpenseDto {
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
  category:
    | 'ELECTRICITY'
    | 'RENT'
    | 'WAGES'
    | 'TRANSPORT'
    | 'PACKAGING'
    | 'REPAIRS'
    | 'INTERNET'
    | 'WATER'
    | 'GAS'
    | 'OFFICE'
    | 'MARKETING'
    | 'OTHER';

  @IsString()
  @MinLength(2)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsOptional()
  @IsEnum([
    'CASH',
    'BANK_TRANSFER',
    'DIGITAL_WALLET',
    'CARD',
    'OTHER',
  ])
  paymentMethod?:
    | 'CASH'
    | 'BANK_TRANSFER'
    | 'DIGITAL_WALLET'
    | 'CARD'
    | 'OTHER';

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