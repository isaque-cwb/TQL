import { PartialType } from '@nestjs/mapped-types';
import { CreateCcDto } from './create-cc.dto';

export class UpdateCcDto extends PartialType(CreateCcDto) {}
