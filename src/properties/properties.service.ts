import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from '@/properties/entities/property.entity'
import { Repository } from 'typeorm';

@Injectable()
export class PropertiesService {


  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) { }


  async create(createPropertyDto: CreatePropertyDto): Promise<CreatePropertyDto> {
    return await this.propertyRepository.save(createPropertyDto);
  }

  findAll() {
    return `This action returns all properties`;
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
