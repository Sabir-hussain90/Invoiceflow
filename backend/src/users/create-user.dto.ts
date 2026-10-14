import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(2)
  fullName: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(['OWNER', 'CASHIER', 'STOCK_MANAGER', 'ADMIN'])
  role?: 'OWNER' | 'CASHIER' | 'STOCK_MANAGER' | 'ADMIN';

  @IsOptional()
  @IsString()
  shopId?: string;
}