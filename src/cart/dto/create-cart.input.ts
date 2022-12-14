import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCartInput {
  @Field(() => Int)
  userId: number;
}
