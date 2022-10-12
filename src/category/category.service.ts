import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryInput: CreateCategoryInput) {
    return this.prisma.category.create({
      data: createCategoryInput
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: {
        id
      }
    });
  }

  findProductCategory(id: number) {
    return this.prisma.category.findFirst({
      where: {
        products: {
          
        }
      }
    });
  }

  update(updateCategoryInput: UpdateCategoryInput) {
    return this.prisma.category.update({
      where: {
        id: updateCategoryInput.id
      },
      data: updateCategoryInput
    });
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
