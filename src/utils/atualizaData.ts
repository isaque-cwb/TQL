export function atualizaData(data: String) {
  const dateNow = new Date()
  const partesData = data.split('/').map(String)
  const dia = parseInt(partesData[0], 10)
  const mes = parseInt(partesData[1], 10) - 1 // O mês começa em 0 (janeiro) no JavaScript
  const ano = parseInt(partesData[2], 10)
  dateNow.setDate(dia)
  dateNow.setMonth(mes)
  dateNow.setFullYear(ano)

  return dateNow
}
