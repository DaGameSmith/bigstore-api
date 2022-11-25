import { Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  create(createCartInput: number) {
    return this.prisma.cart.create({
      data: {
        user: {
          connect: {
            id: createCartInput,
          }
        }
      }
    });
  }

  // findAll() {
  //   return this.prisma.cart.findMany();
  // }

  findCartById(id: number) {
    return this.prisma.cart.findUnique({
      where: {
        id
      }
    });
  }

  // findCartProductsById(id: number) {
  //   return this.prisma.cart.findMany({
  //     where: {
  //       id
  //     },
  //     include: {
  //       products: {
  //         select:{
  //           name: true,
  //           price: true,
  //           id: true,
  //         }
  //       }
  //     }
  //   });
  // }
  


  findOne(id: number) {
    return this.prisma.cart.findUnique({
      where: {
        userId: id
      }
    });
  }

  //not tested yet
  update(updateCartInput: UpdateCartInput) {
    return this.prisma.cart.update({
      where: {
        userId: updateCartInput.userId
      },
      data: {
        products: {
          connect: {
            id: updateCartInput.productId
          }
        }
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
