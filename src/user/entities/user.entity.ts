import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from '../../product/entities/product.entity';
import { Order } from '../../order/entities/order.entity';
import { Cart } from '../../cart/entities/cart.entity';


@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  address: string;

  @Field(type => [Product])
  products: Product[];

  @Field(type => Cart)
  cart: Cart;

  // @Field()
  // orders: Order[];

}
