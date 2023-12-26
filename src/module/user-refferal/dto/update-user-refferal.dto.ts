import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRefferalDto } from './create-user-refferal.dto';

export class UpdateUserRefferalDto extends PartialType(CreateUserRefferalDto) {}
