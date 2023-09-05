export class CreateTimeSheetDto {
  fld_dt_tlanca: Date // data de lançamento do registro
  fld_dt_tlancarg: Date // data do dia do apontamento
  fld_ds_tlancatp: String //gravar '0' - Sistema ou '1' Mobile
  fld_rl_tsoli: Number // relacionamento da solicitação
  fld_hh_tlancahora: Date //quantidade de horas
}
