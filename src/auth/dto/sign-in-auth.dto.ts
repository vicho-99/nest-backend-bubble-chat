import { IsNotEmpty, IsString, MaxLength, IsNumber, IsEmail, MinLength } from 'class-validator';

export class SignInDto {

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

}
