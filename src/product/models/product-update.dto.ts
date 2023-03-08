import { IsNotEmpty, IsOptional } from 'class-validator';

export class ProductUpdateDto {
  @IsOptional()
  title: string;
  @IsOptional()
  description: string;
  @IsOptional()
  image: string;
  @IsOptional()
  price: number;
}
