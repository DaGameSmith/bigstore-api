import { CreateCartInput } from './create-cart.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
//import { Product } from '../../product/entities/product.entity';

@InputType()
export class UpdateCartInput {
  // @Field(() => Int)
  // id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  productId: number;
  
}
