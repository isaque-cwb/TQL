import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CcService } from './cc.service';
import { CreateCcDto } from './dto/create-cc.dto';
import { UpdateCcDto } from './dto/update-cc.dto';

@Controller('cc')
export class CcController {
  constructor(private readonly ccService: CcService) {}

  @Post()
  create(@Body() createCcDto: CreateCcDto) {
    return this.ccService.create(createCcDto);
  }

  @Get()
  findAll() {
    return this.ccService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ccService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCcDto: UpdateCcDto) {
    return this.ccService.update(+id, updateCcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ccService.remove(+id);
  }
}
