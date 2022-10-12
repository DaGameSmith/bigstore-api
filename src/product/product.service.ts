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

  findAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }


  findAllMyProducts(id: number): Promise<Product[] | null> {
    return this.prisma.product.findMany({
      where: {
        userId: id
      }
    });
  }

  async findByName(name: string): Promise<Product[] | null> {
    return this.prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        }
      }
    });
  }

  async findByCategory(name: string): Promise<Product[] | null> {
    return this.prisma.product.findMany({
      where: {
        category: {
          name: {
            contains: name,
            mode: "insensitive",
          }
        }
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
