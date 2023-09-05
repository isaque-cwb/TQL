import { PartialType } from '@nestjs/mapped-types';
import { CreateSoliDto } from './create-soli.dto';

export class UpdateSoliDto extends PartialType(CreateSoliDto) {}
