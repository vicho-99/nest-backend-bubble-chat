import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyAssignmentDto } from './create-property-assignment.dto';

export class UpdatePropertyAssignmentDto extends PartialType(CreatePropertyAssignmentDto) {}
