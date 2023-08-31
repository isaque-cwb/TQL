import { Injectable } from '@nestjs/common'
import { CreateProspectDto } from './dto/create-prospect.dto'
import { UpdateProspectDto } from './dto/update-prospect.dto'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class ProspectService {
  constructor(private prisma: PrismaService) {}
  // create(createProspectDto: CreateProspectDto) {
  //   return 'This action adds a new prospect';
  // }

  async findAll() {
    const result = await this.prisma.$queryRaw`select 
    fld_sq_tsoli as "idSoli", 
    fld_prospec_seq as "idPV", 
    concat(fld_ds_prospectpv, ' - ', fld_ds_clienterz) as "pvCliente",
    case when fld_seq_colaborpj is null then fld_colabo_seq else fld_seq_colaborpj end as "idColabora",
    case when fld_ds_colaborpjnm is null then fld_ds_colabonm else fld_ds_colaborpjnm end as "colaborador",
    case when fld_ds_colaborpjmat is null then fld_ds_colabomat else fld_ds_colaborpjmat end as "matricula",
    case when fld_ds_colaborpjmat is null then 'CLT' else 'PJ' end as "CLT/PJ"
    from tab_88_tsoli
    inner join tab_06_prospect on fld_prospec_seq = fld_rl_prospect
    inner join tab_01_cliente on fld_cliente_seq = fld_rl_cliente
    left join tab_01_colabora on fld_colabo_seq = fld_rl_colabora 
    left join tab_01_colaborpj on fld_seq_colaborpj = fld_rl_colaborpj
    where
    fld_dt_tsoliapro is not null`

    // const result = await this.prisma.tab_06_prospect.findMany({
    //   where: {
    //     fld_ds_prospectpv: {
    //       not: null
    //     }
    //   },
    //   select: {
    //     fld_prospec_seq: true,
    //     fld_ds_prospectpv: true,
    //     tab_01_cliente: {
    //       select: {
    //         fld_ds_clienterz: true
    //       }
    //     }
    //   },
    //   orderBy: {
    //     fld_prospec_seq: 'asc'
    //   }
    // })
    // const processedData = result.map(item => {
    //   const pv_cliente =
    //     item.fld_ds_prospectpv + ' ' + item.tab_01_cliente?.fld_ds_clienterz
    //   const id = item.fld_prospec_seq

    //   return {
    //     id,
    //     pv_cliente
    //   }
    // })

    return result
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
