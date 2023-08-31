import { Module } from '@nestjs/common'
import { ProspectService } from './prospect.service'
import { ProspectController } from './prospect.controller'
import { PrismaService } from 'src/database/prisma.service'

@Module({
  controllers: [ProspectController],
  providers: [ProspectService, PrismaService]
})
export class ProspectModule {}
