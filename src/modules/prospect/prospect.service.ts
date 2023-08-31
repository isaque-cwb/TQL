import { Injectable } from '@nestjs/common'
import { CreateProspectDto } from './dto/create-prospect.dto'
import { UpdateProspectDto } from './dto/update-prospect.dto'
import { PrismaService } from 'src/database/prisma.service'
import { json } from 'express'

@Injectable()
export class ProspectService {
  constructor(private prisma: PrismaService) {}
  // create(createProspectDto: CreateProspectDto) {
  //   return 'This action adds a new prospect';
  // }

  async findAll() {
    const result = await this.prisma.tab_06_prospect.findMany({
      where: {
        fld_ds_prospectpv: {
          not: null
        }
      },
      select: {
        fld_prospec_seq: true,
        fld_ds_prospectpv: true,
        tab_01_cliente: {
          select: {
            fld_ds_clienterz: true
          }
        }
      },
      orderBy: {
        fld_prospec_seq: 'asc'
      }
    })
    const processedData = result.map(item => {
      const pv_cliente =
        item.fld_ds_prospectpv + ' ' + item.tab_01_cliente?.fld_ds_clienterz
      const id = item.fld_prospec_seq

      return {
        id,
        pv_cliente
      }
    })

    return processedData
  }

  findOne(id: number) {
    return `This action returns a #${id} prospect`
  }

  // update(id: number, updateProspectDto: UpdateProspectDto) {
  //   return `This action updates a #${id} prospect`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} prospect`;
  // }
}
