import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { PrismaService } from '../prisma.service';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [forwardRef(() =>UserModule), forwardRef(() =>ProductModule)],
  providers: [OrderResolver, OrderService, PrismaService],
  exports: [OrderService],
})
export class OrderModule {}
