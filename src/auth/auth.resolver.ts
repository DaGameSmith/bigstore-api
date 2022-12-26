import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginAuthInput } from './dto/login-auth.input';
import { GqlAuthGuard } from './guards/local-auth.guard';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginAuthInput') loginAuthInput: LoginAuthInput, @Context() context) {
    return this.authService.login(context.user);
  }

}
