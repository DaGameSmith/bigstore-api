import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id: number;

  // @Field()
  // name: string;

  // @Field()
  // email: string;

  @Field()
  address: string;
}
