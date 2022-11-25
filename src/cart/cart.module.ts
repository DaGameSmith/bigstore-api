import { Module , forwardRef} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { PrismaService } from '../prisma.service';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => ProductModule)],
  providers: [CartResolver, CartService, PrismaService],
  exports: [CartService],
})
export class CartModule {}
