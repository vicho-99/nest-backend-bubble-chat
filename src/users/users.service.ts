import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {

    return await this.userRepository.save(createUserDto);

  }

  async findAll(): Promise<CreateUserDto[]> {

    return await this.userRepository.find();

  }

  async findOne(userId: string): Promise<CreateUserDto> {

    const data = await this.userRepository.findOneBy({ userId });

    if (!data) {
      throw new NotFoundException('Car no found');
    }

    return data;
  }

  update(userId: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(userId, updateUserDto)
  }

  async remove(userId: string): Promise<boolean> {
    return (await this.userRepository.delete(userId)).affected > 0
  }

  async findOneByEmail(email: string) {

    const data = await this.userRepository.findOne({
      select: ['role', 'password', 'userId', 'name', 'email', 'isVerified'],
      where: {
        email
      },
      relations: {
        role: true,
      },
    });

    return data;
  }

}
