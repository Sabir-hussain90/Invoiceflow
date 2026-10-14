import { IsOptional, IsString } from 'class-validator';

export class ProfitQueryDto {
  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;
}