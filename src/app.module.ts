import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyAssignmentModule } from './property-assignment/property-assignment.module';
import { PropertiesModule } from './properties/properties.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { EventsModule } from './events/events.module';
import typeOrmConfig from './core/config/database/pg';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    PropertyAssignmentModule,
    PropertiesModule,
    AuthModule,
    RolesModule,
    EventsModule
  ],
})
export class AppModule { }
