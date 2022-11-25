import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ProductService } from '../product/product.service';
import { CartService } from '../cart/cart.service';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly cartService: CartService,
  ) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    // return this.userService.create(createUserInput);
    const result = await this.userService.create(createUserInput);
    await this.cartService.create(result.id);
    return result;
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => [User], { name: 'userswithproducts' })
  findAllWithProducts() {
    return this.userService.findAllWithProducts();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @ResolveField()
  async products(@Parent() user: User) {
    const { id } = user;
    return this.productService.findAllMyProducts(id);
  }

  @ResolveField()
  async cart(@Parent() user: User) {
    const { id } = user;
    return this.cartService.findOne(id);
  }

  @Mutation(() => User)
  updateUserAddress(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput);
  }

  
  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.userService.remove(id);
  // }
  
}
