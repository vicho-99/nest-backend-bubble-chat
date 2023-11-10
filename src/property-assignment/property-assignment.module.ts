import { Module } from '@nestjs/common';
import { PropertyAssignmentService } from './property-assignment.service';
import { PropertyAssignment } from './entities/property-assignment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyAssignment])],
  providers: [PropertyAssignmentService],
  exports: [PropertyAssignmentService]
})
export class PropertyAssignmentModule { }
