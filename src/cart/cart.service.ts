import { Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  create(createCartInput: CreateCartInput) {
    return this.prisma.cart.create({
      data: createCartInput
    });
  }

  // findAll() {
  //   return this.prisma.cart.findMany();
  // }

  findOne(id: number) {
    return this.prisma.cart.findUnique({
      where: {
        id
      }
    });
  }

  update(updateCartInput: UpdateCartInput) {
    return this.prisma.cart.update({
      where: {
        id: updateCartInput.id
      },
      data: updateCartInput
    });
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
