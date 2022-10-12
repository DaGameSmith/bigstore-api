import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from '../../product/entities/product.entity';
import { Order } from '../../order/entities/order.entity';


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

  // @Field()
  // orders: Order[];

}
