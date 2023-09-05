import { Module } from '@nestjs/common'
import { SoliService } from './soli.service'
import { SoliController } from './soli.controller'
import { PrismaService } from 'src/database/prisma.service'

@Module({
  controllers: [SoliController],
  providers: [SoliService, PrismaService]
})
export class SoliModule {}
