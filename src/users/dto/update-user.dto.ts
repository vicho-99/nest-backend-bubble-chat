
import { IsNotEmpty, IsString, MaxLength, IsObject } from 'class-validator';

export class UpdateUserDto {

    userId?: string;

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    roleId: string;
}
