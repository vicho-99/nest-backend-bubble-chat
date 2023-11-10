import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RoleDto {
    @IsNotEmpty()
    @IsString()
    roleId: string;

    @IsOptional()
    name: string;

    @IsOptional()
    description: string;

}


