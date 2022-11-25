import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { CategoryModule } from '../category/category.module'
import { PrismaService } from '../prisma.service';

@Module({
  imports: [forwardRef(() =>CategoryModule)],
  providers: [ProductResolver, ProductService, PrismaService],
  exports: [ProductService],
})
export class ProductModule {}
