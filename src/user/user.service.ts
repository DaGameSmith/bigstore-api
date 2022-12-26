import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<User> {

    return this.prisma.user.create({
      data: createUserInput
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      // include: {
      //   products: true,
      //   orders: true,
      // }
    });
  }

  findAllWithProducts(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        products: true,
        orders: true,
      }
    });
  }

  findOneWithEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    });
  }

  findOneWithCart(id: number): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        cart: {
          id
        }
      }
    });
  }

  update(updateUserInput: UpdateUserInput): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: updateUserInput.id
      },
      data: updateUserInput
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
  
}
