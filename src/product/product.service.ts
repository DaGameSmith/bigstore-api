import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(createProductInput: CreateProductInput) {
    return this.prisma.product.create({
      data: createProductInput
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: {
        id
      }
    });
  }

  update(updateProductInput: UpdateProductInput) {
    return this.prisma.user.update({
      where: {
        id: updateProductInput.id
      },
      data: updateProductInput
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
