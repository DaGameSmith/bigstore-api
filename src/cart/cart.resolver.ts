import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent} from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Cart)
export class CartResolver {
  constructor(
    private readonly cartService: CartService,
    private readonly userService: UserService,
    private readonly productService: ProductService
  ) {}

  // @Mutation(() => Cart)
  // createCart(@Args('createCartInput') createCartInput: CreateCartInput) {
  //   return this.cartService.create(createCartInput);
  // }

  // @Query(() => [Cart], { name: 'carts' })
  // findAll() {
  //   return this.cartService.findAll();
  // }


  // @ResolveField()
  // async cart(@Parent() cart: Cart) {
  //   const { id } = cart;
  //   return this.userService.findOneWithCart(id);
  // }
  

  @Query(() => Cart)
  @UseGuards(JwtAuthGuard)
  findCartWithUserId(@Args('id', { type: () => Int }) id: number) {
    return this.cartService.findOne(id);
  }

  @Mutation(() => Cart)
  @UseGuards(JwtAuthGuard)
  updateCart(@Args('updateCartInput') updateCartInput: UpdateCartInput) {
    return this.cartService.update(updateCartInput);
  }

  @Mutation(() => Cart)
  @UseGuards(JwtAuthGuard)
  removeFromCart(@Args('id', { type: () => Int }) id: number) {
    return this.cartService.remove(id);
  }

  @ResolveField()
  async user(@Parent() cart: Cart) {
    const { id } = cart;
    const cartData = await this.cartService.findCartById(id);
    const result = await this.userService.findOne(cartData.userId);
    return result;
  }

  @ResolveField()
  async products(@Parent() cart: Cart) {
    const { id } = cart;
    const cartData = await this.cartService.findCartById(id);
    const result = await this.productService.findByCartId(cartData.userId);
    // return this.productService.(id);
    return result;
  }

}
