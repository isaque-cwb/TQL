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
    const result = await this.prisma
      .$queryRaw`select fld_cc_seq as idCC, concat(fld_ds_cdcc, ' - ', fld_ds_dscc)as cc, fld_prospec_seq as idPV, fld_ds_ccrelts as aceitaTs , fld_nr_qthoras as qtHoras  from tab_01_cc
      inner join tab_01_ccrel on fld_rl_cc = fld_cc_seq
      inner join tab_06_prospect on fld_prospec_seq = fld_rl_prospec
  where fld_ds_ccrelts = 'X'`

    return result
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
