import { Injectable } from '@nestjs/common'
import { CreateTimeSheetDto } from './dto/create-time-sheet.dto'
import { UpdateTimeSheetDto } from './dto/update-time-sheet.dto'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class TimeSheetService {
  constructor(private prisma: PrismaService) {}

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

    const inserted = await this.prisma.tab_88_tlanca
      .create({
        data: {
          fld_dt_tlanca: dateNow,
          fld_dt_tlancarg: dataTrabalhada,
          fld_ds_tlancatp: '1',
          fld_rl_tsoli: 8,
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

  findOne(id: number) {
    return `This action returns a #${id} timeSheet`
  }

  update(id: number, updateTimeSheetDto: UpdateTimeSheetDto) {
    return `This action updates a #${id} timeSheet`
  }

  remove(id: number) {
    return `This action removes a #${id} timeSheet`
  }
}
