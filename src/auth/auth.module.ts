import { Module , forwardRef} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [forwardRef(() => UserModule), PassportModule,
    JwtModule.register({
      signOptions: {expiresIn: '300s'},
      secret: 'hide-me',
    }),
  ],
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
