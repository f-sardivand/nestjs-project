import { IsNotEmpty } from 'class-validator';
import { OrderItem } from './order-item.entity';

export class OrderCreateDto {
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  order_items: []
}
