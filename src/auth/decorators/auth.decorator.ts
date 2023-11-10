import { applyDecorators, UseGuards } from '@nestjs/common';


import { Roles } from './roles.decorator';
import { Role } from '@/core/common/emuns/rol.emun';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

export function Auth(role: Role) {

    return applyDecorators(
        Roles(role), 
        UseGuards(AuthGuard, RolesGuard)
    );
}