import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  create(createOrderInput: CreateOrderInput) {
    return this.prisma.order.create({
      data: createOrderInput
    });
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({
      where: {
        id
      }
    });
  }

  update(updateOrderInput: UpdateOrderInput) {
    return this.prisma.order.update({
      where: {
        id: updateOrderInput.id
      },
      data: updateOrderInput
    });
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
