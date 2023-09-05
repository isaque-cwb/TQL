import { Module } from '@nestjs/common'
import { TimeSheetService } from './time-sheet.service'
import { TimeSheetController } from './time-sheet.controller'
import { PrismaService } from 'src/database/prisma.service'

@Module({
  controllers: [TimeSheetController],
  providers: [TimeSheetService, PrismaService]
})
export class TimeSheetModule {}
