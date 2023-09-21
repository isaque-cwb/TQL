import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { TimeSheetService } from './time-sheet.service'
import { CreateTimeSheetDto } from './dto/create-time-sheet.dto'
import { UpdateTimeSheetDto } from './dto/update-time-sheet.dto'

@Controller('time-sheet')
export class TimeSheetController {
  constructor(private readonly timeSheetService: TimeSheetService) {}

  @Post('create')
  create(@Body() createTimeSheetDto: CreateTimeSheetDto) {
    return this.timeSheetService.create(createTimeSheetDto)
  }

  @Get()
  findAll() {
    return this.timeSheetService.findAll()
  }

  @Get('tlanca')
  findAllLanca(){
    return this.timeSheetService.findAllLanca()
  }

  @Get('tconfig')
  findTConfig(){
    return this.timeSheetService.findTConfig()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeSheetService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeSheetDto: UpdateTimeSheetDto
  ) {
    return this.timeSheetService.update(+id, updateTimeSheetDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeSheetService.remove(+id)
  }
}
