import { Module } from '@nestjs/common'
import { CcService } from './cc.service'
import { CcController } from './cc.controller'
import { PrismaService } from 'src/database/prisma.service'

@Module({
  controllers: [CcController],
  providers: [CcService, PrismaService]
})
export class CcModule {}
