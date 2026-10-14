import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  fullName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION'])
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';

  @IsOptional()
  @IsEnum(['OWNER', 'CASHIER', 'STOCK_MANAGER', 'ADMIN'])
  role?: 'OWNER' | 'CASHIER' | 'STOCK_MANAGER' | 'ADMIN';

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}