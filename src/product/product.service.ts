import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(createProductInput: CreateProductInput): Promise<Product> {
    return this.prisma.product.create({
      data: {
        name: createProductInput.name,
        price: createProductInput.price,
        user: {
          connect: {
            id: createProductInput.userId,
          }
        },
        category: {
          connect: {
            id: createProductInput.categoryId,
          }
        }
      }
    });
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  findAllWhere(id: number): Promise<Product[] | null> {
    return this.prisma.product.findMany({
      where: {
        userId: id
      }
    });
  }

  findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: {
        id
      }
    });
  }

  update(updateProductInput: UpdateProductInput): Promise<Product> {
    return this.prisma.product.update({
      where: {
        id: updateProductInput.id
      },
      data: updateProductInput
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
