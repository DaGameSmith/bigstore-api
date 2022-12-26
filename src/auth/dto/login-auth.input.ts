import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class LoginAuthInput {
  @Field()
  email: string;

  @Field()
  password: string;
}