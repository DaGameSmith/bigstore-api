import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';


@ObjectType()
export class Order {
  @Field(type => Int)
  id: number;

  @Field(type => User)
  user: User;

  @Field(type => Product)
  product: Product;

  // @Field(type => Cart)
  // products: Cart;
  
}
