import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/users/users.module';
import { PropertiesModule } from '@/properties/properties.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@/core/config/jwt/constants';
import { PropertyAssignmentModule } from '@/property-assignment/property-assignment.module';


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
    PropertiesModule,
    PropertyAssignmentModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
