import { Injectable } from '@nestjs/common'
import { CreateTimeSheetDto } from './dto/create-time-sheet.dto'
import { UpdateTimeSheetDto } from './dto/update-time-sheet.dto'
import { PrismaService } from 'src/database/prisma.service'



type lancaType = {
  idLanca: number,
  dtLanca: string,
  dtRegLanca: string,
  rlIdSoli: Number,
  hrLanca: string
}

@Injectable()
export class TimeSheetService {
  constructor(private prisma: PrismaService) { }

  async create(createTimeSheetDto: CreateTimeSheetDto) {
    const dateNow = new Date()
    const dataSelecionada = createTimeSheetDto.fld_dt_tlanca.toString()
    const partesData = dataSelecionada.split('/').map(String)
    const dia = parseInt(partesData[0], 10)
    const mes = parseInt(partesData[1], 10) - 1 // O mês começa em 0 (janeiro) no JavaScript
    const ano = parseInt(partesData[2], 10)
    dateNow.setDate(dia)
    dateNow.setMonth(mes)
    dateNow.setFullYear(ano)

    const dataTrabalhada = new Date()
    const dataTrabalhadaInformada =
      createTimeSheetDto.fld_dt_tlancarg.toString()
    const partesDataTrabalhada = dataTrabalhadaInformada.split('/').map(String)
    const diaTrab = parseInt(partesDataTrabalhada[0], 10)
    const mesTrab = parseInt(partesDataTrabalhada[1], 10) - 1 // O mês começa em 0 (janeiro) no JavaScript
    const anoTrab = parseInt(partesDataTrabalhada[2], 10)
    dataTrabalhada.setDate(diaTrab)
    dataTrabalhada.setMonth(mesTrab)
    dataTrabalhada.setFullYear(anoTrab)

    const qtdHoras = new Date()
    const horario = createTimeSheetDto.fld_hh_tlancahora.toString()
    const partesHora = horario.split(':').map(Number)
    partesHora
    const horas = partesHora[0] - 3
    const minutos = partesHora[1]
    qtdHoras.setHours(horas)
    qtdHoras.setMinutes(minutos)


    const rlSoli = parseInt(createTimeSheetDto.fld_rl_tsoli)


    const inserted = await this.prisma.tab_88_tlanca
      .create({
        data: {
          fld_dt_tlanca: dateNow,
          fld_dt_tlancarg: dataTrabalhada,
          fld_ds_tlancatp: '1',
          fld_rl_tsoli: rlSoli,
          fld_hh_tlancahora: qtdHoras
        }
      })
      .then(() => {
        return {
          'Data Lançamento': dateNow,
          'Data Trabalhado': dataTrabalhada,
          'Qtd de Horas': qtdHoras
        }
      })
      .catch(error => {
        console.log(error)
        throw new Error('Erro ao Criar novo Lançamento')
      })

    return inserted
  }

  findAll() {
    return `This action returns all timeSheet`
  }

  async findAllLanca() {
    const result = await this.prisma.$queryRaw<lancaType[]>`select 
     fld_sq_tlanca as "idLanca",
     fld_dt_tlanca as "dtLanca",
     fld_dt_tlancarg as "dtRegLanca",
     fld_rl_tsoli as "rlIdSoli",
     fld_hh_tlancahora as "hrLanca"
 from 
   tab_88_tlanca`

    
    const data = result.map((item: lancaType) => {

      const dateObj = new Date(item.dtLanca)
      const dia = dateObj.getUTCDate()
      const mes = dateObj.getUTCMonth() + 1
      const ano = dateObj.getUTCFullYear()
      const dtLanca = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano.toString()}`

      const dateObjReg = new Date(item.dtRegLanca)
      const diaReg = dateObjReg.getUTCDate()
      const mesReg = dateObjReg.getUTCMonth() + 1
      const anoReg = dateObjReg.getUTCFullYear()
      const dtRegLanca = `${diaReg.toString().padStart(2, '0')}/${mesReg.toString().padStart(2, '0')}/${anoReg.toString()}`

      const strHr = new Date(item.hrLanca) //1970-01-01T02:30:00.000Z
      const hora = strHr.getUTCHours()
      const minutos = strHr.getUTCMinutes()

      const hrLanca = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`

      return {
        idLanca: item.idLanca,
        dtLanca,
        dtRegLanca,
        rlIdSoli: item.rlIdSoli,
        hrLanca
      }
    })

    return data

  }

  findOne(id: number) {
    return `This action returns a #${id} timeSheet`
  }

  async findTConfig() {
    const result = await this.prisma.$queryRaw`select
    fld_sq_tconfig as "seqTconfig",
    fld_hh_tconfigqthdpj as "qtDiaPJ",
    fld_hh_tconfigqthdclt as "qtDiaCLT",
    fld_hh_tconfigttmespj as "qtMesPJ",
    fld_hh_tconfigttmesclt as "qtMesCLT"
    from 
    tab_88_tconfig`


    const QtDiaPJ = result[0].qtDiaPJ.toISOString().substr(11, 5)
    const qtDiaCLT = result[0].qtDiaCLT.toISOString().substr(11, 5)



    return {
      seqTconfig: result[0].seqTconfig,
      QtDiaPJ,
      qtDiaCLT,
      qtMesPJ: result[0].qtMesPJ,
      qtMesCLT: result[0].qtMesCLT,
    }
  }

  update(id: number, updateTimeSheetDto: UpdateTimeSheetDto) {
    return `This action updates a #${id} timeSheet`
  }

  remove(id: number) {
    return `This action removes a #${id} timeSheet`
  }


}
