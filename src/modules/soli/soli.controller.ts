import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SoliService } from './soli.service';
import { CreateSoliDto } from './dto/create-soli.dto';
import { UpdateSoliDto } from './dto/update-soli.dto';

@Controller('soli')
export class SoliController {
  constructor(private readonly soliService: SoliService) {}

  @Post()
  create(@Body() createSoliDto: CreateSoliDto) {
    return this.soliService.create(createSoliDto);
  }

  @Get()
  findAll() {
    return this.soliService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.soliService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSoliDto: UpdateSoliDto) {
    return this.soliService.update(+id, updateSoliDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.soliService.remove(+id);
  }
}
