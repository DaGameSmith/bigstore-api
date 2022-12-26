import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent} from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => [Order])
  @UseGuards(JwtAuthGuard)
  findAllOrders() {
    return this.orderService.findAll();
  }

  @Query(() => [Order])
  @UseGuards(JwtAuthGuard)
  findUserOrders(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.findUserOrders(id);
  }

  @ResolveField()
  async user(@Parent() order: Order) {
    const { id } = order;
    const orderData = await this.orderService.findOne(id);
    const result = await this.userService.findOne(orderData.userId);
    return result;
  }

  @ResolveField()
  async product(@Parent() order: Order) {
    const { id } = order;
    const orderData = await this.orderService.findOne(id);
    const result = await this.productService.findById(orderData.productId);
    // return this.productService.(id);
    return result;
  }

  // @Mutation(() => Order)
  // updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
  //   return this.orderService.update(updateOrderInput);
  // }

  // @Mutation(() => Order)
  // removeOrder(@Args('id', { type: () => Int }) id: number) {
  //   return this.orderService.remove(id);
  // }
}
