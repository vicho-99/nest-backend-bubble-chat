import { CreatePropertyDto } from '@/properties/dto/create-property.dto';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SignUpDto {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreatePropertyDto)
    property: CreatePropertyDto;
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateUserDto)
    user: CreateUserDto;
}
