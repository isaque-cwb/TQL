import { Injectable } from '@nestjs/common'
import { CreateSoliDto } from './dto/create-soli.dto'
import { UpdateSoliDto } from './dto/update-soli.dto'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class SoliService {
  constructor(private prisma: PrismaService) { }

  create(createSoliDto: CreateSoliDto) {
    return 'This action adds a new soli'
  }

  async findAll() {
    const result = await this.prisma.$queryRaw`select 
    fld_sq_tsoli as "idSoli",
    fld_rl_prospect as "RLPV",
    tab_01_cc.fld_cc_seq as "idCC",
	  fld_rl_colabora as "idCLT",
	  fld_rl_colaborPJ as "idPJ"
    from tab_88_tsoli
    inner join tab_01_ccrel on tab_01_ccrel.fld_ccrel_seq = tab_88_tsoli.fld_rl_ccrel
    inner Join tab_01_cc On tab_01_cc.fld_cc_seq = tab_01_ccrel.fld_rl_cc
    where fld_dt_tsoliapro is not null and fld_dt_tsolirepro is null
`

    return result
  }

  findOne(id: number) {
    return `This action returns a #${id} soli`
  }

  update(id: number, updateSoliDto: UpdateSoliDto) {
    return `This action updates a #${id} soli`
  }

  remove(id: number) {
    return `This action removes a #${id} soli`
  }
}
