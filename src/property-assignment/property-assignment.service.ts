import { Injectable } from '@nestjs/common';
import { CreatePropertyAssignmentDto } from './dto/create-property-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyAssignment } from './entities/property-assignment.entity';

@Injectable()
export class PropertyAssignmentService {

  constructor(
    @InjectRepository(PropertyAssignment)
    private readonly propertyRepository: Repository<PropertyAssignment>,
  ) { }


  create(createPropertyAssignmentDto: CreatePropertyAssignmentDto) {

    return this.propertyRepository.save(createPropertyAssignmentDto)

  }

}
