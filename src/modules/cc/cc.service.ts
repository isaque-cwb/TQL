import { Injectable } from '@nestjs/common'
import { CreateCcDto } from './dto/create-cc.dto'
import { UpdateCcDto } from './dto/update-cc.dto'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class CcService {
  constructor(private prisma: PrismaService) {}

  create(createCcDto: CreateCcDto) {
    return 'This action adds a new cc'
  }

  async findAll() {
    const result = await this.prisma.tab_01_cc.findMany({
      select: {
        fld_cc_seq: true,
        fld_ds_cdcc: true,
        fld_ds_dscc: true
      },
      orderBy: {
        fld_ds_cdcc: 'asc'
      }
    })

    const ccData = result.map(item => {
      const id = item.fld_cc_seq
      const cc = item.fld_ds_cdcc + ' - ' + item.fld_ds_dscc

      return { id, cc }
    })

    return ccData
  }

  findOne(id: number) {
    return `This action returns a #${id} cc`
  }

  update(id: number, updateCcDto: UpdateCcDto) {
    return `This action updates a #${id} cc`
  }

  remove(id: number) {
    return `This action removes a #${id} cc`
  }
}
