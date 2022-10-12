import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from '../../category/entities/category.entity';

@ObjectType()
export class Product {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => Int)
  price: number;

  @Field(type => Category)
  category: Category;
}
