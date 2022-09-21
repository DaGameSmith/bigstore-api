import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ProductResolver, ProductService, PrismaService],
  exports: [ProductService],
})
export class ProductModule {}
