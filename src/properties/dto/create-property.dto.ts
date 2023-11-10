import { IsNotEmpty, IsString, MaxLength } from 'class-validator';


export class CreatePropertyDto {

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    url: string;

}
