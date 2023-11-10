import { RoleDto } from '@/roles/dto/role-dto';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, IsEmail, MinLength, IsObject, ValidateNested } from 'class-validator';

export class CreateUserDto {

    userId?: string;
    createAt?: Date;
    isVerified?: boolean;

    @MaxLength(255)
    @MinLength(4)
    @IsString()
    @IsNotEmpty()
    name: string;

    @MaxLength(255)
    @MinLength(4)
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MaxLength(255)
    @MinLength(6)
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => RoleDto)
    role: RoleDto;

}


