import { IsNotEmpty, IsOptional } from 'class-validator';

export class ProductCreateDto {
  @IsNotEmpty()
  title: string;
  @IsOptional()
  description: string;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  price: number;
}
