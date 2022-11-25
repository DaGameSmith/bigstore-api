import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { ProductModule } from '../product/product.module';
import { PrismaService } from '../prisma.service';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [ProductModule, CartModule],
  providers: [UserResolver, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
