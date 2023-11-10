import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up-auth.dto';
import { UsersService } from '@/users/users.service';
import { PropertiesService } from '@/properties/properties.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { CreatePropertyDto } from '@/properties/dto/create-property.dto';
import { PropertyAssignmentService } from '@/property-assignment/property-assignment.service';
import { CreatePropertyAssignmentDto } from '@/property-assignment/dto/create-property-assignment.dto';
import { SignInDto } from './dto/sign-in-auth.dto';
import removeKey from '@/core/utils/remove-key'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(

    private readonly usersService: UsersService,
    private readonly propertyService: PropertiesService,
    private readonly propertyAssignmentService: PropertyAssignmentService,
    private jwtService: JwtService

  ) { }

  async signUp(signUp: SignUpDto) {

    let user: CreateUserDto = signUp.user;

    let property: CreatePropertyDto = signUp.property;

    let propertyAssignment: CreatePropertyAssignmentDto = {
      user,
      property
    };

    user.password = await bcrypt.hash(user.password, 10);

    await this.usersService.create(user);
    await this.propertyService.create(property);
    await this.propertyAssignmentService.create(propertyAssignment)

    return {
      user,
      property,
    };

  }

  async signIn(signIp: SignInDto) {

    let user: CreateUserDto = await this.usersService.findOneByEmail(signIp.email);

    if (!user)
      throw new HttpException('Email not registered', HttpStatus.UNAUTHORIZED);

    const isPasswordValid = await bcrypt.compare(signIp.password, user.password);

    if (!isPasswordValid)
      throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);

    const token = await this.jwtService.signAsync({ id: user.userId, role: user.role.name });

    await removeKey(user, ["password"])

    return { token, user };

  }

}
