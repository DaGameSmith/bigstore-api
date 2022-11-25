import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateOrderInput } from './dto/create-order.input';
//import { UpdateOrderInput } from './dto/update-order.input';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  create(createOrderInput: CreateOrderInput) {
    return this.prisma.order.create({
      data: {
        user: {
          connect: {
            id: createOrderInput.userId,
          }
        },
        product: {
          connect: {
            id: createOrderInput.productId,
          }
        }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({
      where: {
        id
      }
    });
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  findUserOrders(id: number) {
    return this.prisma.order.findMany({
      where: {
        userId: id
      }
    });
  }

  // update(updateOrderInput: UpdateOrderInput) {
  //   return this.prisma.order.update({
  //     where: {
  //       id: updateOrderInput.id
  //     },
  //     data: updateOrderInput
  //   });
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
