import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, ScrollView, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInputMask } from 'react-native-masked-text';
import { useTheme, Button, Stack, } from 'native-base';
import { Input as NBInput } from '../components/Input'
import { Header } from '../components/Header';
import { useUser } from '../contexts/auth';
import api from '../services/api';
import { Loading } from '../components/Loading';




type prospectProps = {
  idPV: string,
  pvCliente: string,
  idColabora: string,
  Colaborador: string,
  Matrícula: string
  CLTPJ: string
  idUsuario: string
}

type ccProps = {
  value: string;
  label: string;
  idcc: string,
  cc: string
  idpv: string,
  aceitats: string,
  qthoras: number
}

type soliProps = {
  idSoli: number,
  RLPV: string,
  idCC: string
}

type lancaProps = {
  idLanca: number,
  dtLanca: string,
  dtRegLanca: string,
  rlIdSoli: number,
  hrLanca: string
}

type tConfigProps = {
  seqTconfig: number,
  QtDiaPJ: string,
  qtDiaCLT: string,
  qtMesPJ: number,
  qtMesCLT: number
}



export function Home() {
  const [pvSel, setPvSel] = useState('');
  const [pvs, setPvs] = useState<prospectProps[]>([]);
  const [cc, setCc] = useState<ccProps[]>([]);
  const [ccSel, setCcSel] = useState('');
  const [soli, setSoli] = useState<soliProps[]>([]);
  const [colaborador, setColaborador] = useState('')
  const [isFocusPv, setIsFocusPv] = useState(false);
  const [isFocusCc, setIsFocusCc] = useState(false);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isValidHour, setIsValidHour] = useState(true);
  const refInputHours = useRef(null)
  const { userData, updateUser } = useUser()
  const { colors } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [idSoli, setIdSoli] = useState(null)
  const [tConfig, setTConfig] = useState({} as tConfigProps)
  const [lanca, setLanca] = useState([])



  //valida formato hora
  const handleBlur = () => {
    // Verifica se o valor inserido está no formato "hh:mm"
    const timeRegex = /^([01]?[0-9]|2[0-4]):([0-5]?[0-9])$/;

    if (time) {
      if (!timeRegex.test(time)) {
        setTime('');
        Alert.alert('ERRO', 'Informe uma quantidade de horas válida.');
        setIsValidHour(false)
      } else {
        const [hours, minutes] = time.split(':');
        const hoursInt = parseInt(hours, 10);
        const minutesInt = parseInt(minutes, 10);

        if (hoursInt >= 24 && minutesInt > 0) {
          setTime('');
          Alert.alert('Erro na quantidade de horas', 'Informe até no máximo 24 horas.');
          setIsValidHour(false)
        }
        setIsValidHour(true)
      }
    }
  };

  //valida formato data
  const handleDateChange = () => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(200\d|201[0-9]|202[0-9]|203[0-9]|2040)$/;

    if (date) {
      if (!dateRegex.test(date)) {
        setIsValid(false)
        setDate('')
        Alert.alert('ERRO', 'Informe uma Data válida.')
      } else {
        setIsValid(true)
      }
    }

  };

  //carregamento de pvs
  useEffect(() => {
    api.get('/Fprospect.rule?action=open&sys=MOB').then((response) => {
      const data = response.data
      const pvsData = data.map((item: prospectProps) => {
        const pvCliente = item.pvCliente
        const idPV = item.idPV
        const idColabora = item.idColabora
        const colaborador = item.Colaborador
        const matricula = item.Matrícula
        const CLTPJ = item.CLTPJ
        const idUsuario = item.idUsuario

        return {
          pvCliente,
          idPV,
          idColabora,
          colaborador,
          matricula,
          CLTPJ,
          idUsuario
        }
      })
      setPvs(pvsData)
    })

  }, [])


  //carregamento de Centro de custo
  useEffect(() => {

    api.get('/Fcc.rule?action=open&sys=MOB').then((response) => {
      const data = response.data
      const ccData = data.map((item: ccProps) => {
        const cc = item.cc
        const idcc = item.idcc
        const idpv = item.idpv
        const aceitats = item.aceitats
        const qthoras = item.qthoras

        return {
          cc,
          idcc,
          idpv,
          aceitats,
          qthoras
        }
      })
      setCc(ccData)
    })
  }, [])


  //Carregamento de Solicitações
  useEffect(() => {
    api.get('/Fsoli.rule?action=open&sys=MOB').then((response) => {
      const data = response.data
      const soliData = data.map((item: soliProps) => {
        const idSoli = item.idSoli
        const RLPV = item.RLPV
        const idCC = item.idCC

        return {
          idSoli,
          RLPV,
          idCC
        }
      })
      setSoli(soliData)
    })

  }, [])

  //Carregamento de Configurações do TimeSheet
  useEffect(() => {
    api.get('/Ftconfig.rule?sys=MOB').then((response) => {
      const data = response.data as tConfigProps
      setTConfig(
        {
          seqTconfig: data.seqTconfig,
          QtDiaPJ: data.QtDiaPJ,
          qtDiaCLT: data.qtDiaCLT,
          qtMesPJ: data.qtMesPJ,
          qtMesCLT: data.qtMesCLT
        }
      )

    })

  }, [])

  //Carregamento de Lançamentos
  function carregarTlanca() {
    api.get('/Ftlanca.rule?sys=MOB').then((response) => {
      const data = response.data
      const lanca = data.map((item: lancaProps) => {
        return {
          idLanca: item.idLanca,
          dtLanca: item.dtLanca,
          dtRegLanca: item.dtRegLanca,
          rlIdSoli: item.rlIdSoli,
          hrLanca: item.hrLanca
        }
      })
      setLanca(lanca)
    })

  }

  //filtrando o pv com o usuário logado
  const filteredPv = pvs.filter(item => {
    if (userData.usr_codigo !== '') {
      // Filtra os itens do centro de custo com base no PV/Cliente selecionado
      return item.idUsuario === userData.usr_codigo;
    }
    return false; // Não Retorna itens se nenhum PV/Cliente foi selecionado
  });


  //filtrando o Centro de custo com o pv selecionado.
  const filteredCc = cc.filter(item => {
    if (pvSel !== '') {
      // Filtra os itens do centro de custo com base no PV/Cliente selecionado
      return item.idpv === pvSel;
    }
    return false; // Não Retorna itens se nenhum PV/Cliente foi selecionado
  });

  //filtrando qtd de horas pela solicitação já filtrada
  function calcularQtdHrDiaMes(lanca: lancaProps[], tConfig: any, idSoli: number, date: string) {

    const configQtDisPJ = tConfig.QtDiaPJ
    const configQtDiaCLT = tConfig.qtDiaCLT
    const configQtMesCLT = tConfig.qtMesCLT
    const configQtMesPJ = tConfig.qtMesPJ


    // filtrando por dia
    const lancaFilteredDia = lanca.filter(item => {
      if (item.rlIdSoli == idSoli && item.dtRegLanca == date) {
        return true
      }
      return false
    })

    const qtdHrDiaLanca = lancaFilteredDia.map(item => {

      const horaSeparada = item.hrLanca.split(':')
      const hora = parseInt(horaSeparada[0])
      const minutos = parseInt(horaSeparada[1])
      const horaParaMinutos = hora * 60
      const horaInteiro = horaParaMinutos + minutos

      return horaInteiro
    })

    //filtrando por Mês 
    const lancaFilteredMes = lanca.filter(item => {
      if (item.rlIdSoli == idSoli) {
        return true
      }
      return false

    })


    const qtdHrMesLanca = lancaFilteredMes.map(item => {

      const horaSeparada = item.hrLanca.split(':')
      const hora = parseInt(horaSeparada[0])
      const minutos = parseInt(horaSeparada[1])
      const horaParaMinutos = hora * 60
      const horaInteiro = horaParaMinutos + minutos

      return horaInteiro

    })





    return {
      qtdDia: qtdHrDiaLanca.reduce((acumulador, elemento) => { return acumulador + elemento }, 0),
      qtdMes: qtdHrMesLanca.reduce((acumulador, elemento) => { return acumulador + elemento }, 0)
    }



  }






  function handleRegister() {

    const dataRegistro = new Date().toISOString()
    const [ano, mes, dia] = dataRegistro.split('-')
    const diaReg = dia.substring(0, 2)
    const dataRegFormat = `${diaReg}/${mes}/${ano}`


    const filteredSoli = soli.filter(item => {

      if (pvSel !== '' && ccSel !== '') {

        // filtra as soli de acordo com o pv e centro de custo 
        return item.RLPV === pvSel && item.idCC === ccSel;
      }
      return false; // não retorna itens se nenhum pv o cc for informado

    })

    switch (true) {
      case pvSel === '':
        return alert('PV não Informado, escolha um PV')
      case ccSel === '':

        return alert('Centro de Custo não Informado, escolha um Centro de Custo')

      case date === '':
        return alert('Data do Registo não Informado, informe a Data do Registro')

      case time === '':
        return alert('Quantidade de Horas não Informado, informe uma Qtd de Horas')

      case filteredSoli.length == 0:
        return alert('Não encontrado Solicitações para este PV com este Centro de Custo')

      default:
        break;
    }



    //verificar se qtd de horas a lançar + qtd de horas já lançado
    //é menor do que a quantidade de horas disponível por dia

    //filtrando com o pv selecionado 
    const filtro = filteredPv.filter(item => { if (item.idPV === pvSel) { return true } })
    //pegar a qtd limite por dia e converter em inteiro de minutos
    const qtdLimitePorDia = filtro[0].CLTPJ === 'CLT' ? tConfig.qtDiaCLT : tConfig.QtDiaPJ
    const qtdLimHoraMin = qtdLimitePorDia.split(':')
    const horaLim = parseInt(qtdLimHoraMin[0])
    const minLim = parseInt(qtdLimHoraMin[1])
    const qtdLimInt = horaLim * 60 + minLim

    //pegar a qtd limite por mes
    const qtdLimitePorMes = filtro[0].CLTPJ === 'CLT' ? tConfig.qtMesCLT : tConfig.qtMesPJ

    //converter o time em uma variável number para comparar
    const qtdHoraInformada = time
    const horaInfomada = qtdHoraInformada.split(':')
    const horaInfo = parseInt(horaInfomada[0])
    const minInfo = parseInt(horaInfomada[1])
    const qtdHoraInfo = horaInfo * 60 + minInfo

    //carregar os lançamentos existentes
    carregarTlanca()

    //executa função para calcular lançamentos existentes
    const qtd = calcularQtdHrDiaMes(lanca, tConfig, filteredSoli[0].idSoli, date)

    const qtdHorasCCFiltered = filteredCc.filter(item => {
      if (item.idcc === ccSel) {
        const minutos = item.qthoras * 60
        return minutos
      }
    })

    const qtdHorasMinutosCCFiltered = qtdHorasCCFiltered[0].qthoras * 60


    //verificar se hora infomada + limite hora por dia é menor que o limite do dia 
    if (qtdHoraInfo + qtd.qtdDia < qtdLimInt) {
      setIsLoading(true)
      if (qtd.qtdMes + qtdHoraInfo < qtdHorasMinutosCCFiltered) {

        setIsLoading(true)
        //criando um novo lançamento
        api.post(`/Ftimesheet-create.rule?action=open&sys=MOB&fld_dt_tlanca=${dataRegFormat}&fld_dt_tlancarg=${date}&fld_ds_tlancatp=1&fld_rl_tsoli=${filteredSoli[0].idSoli}&fld_hh_tlancahora=${time}`).then(() => {
          setCcSel('')
          setPvSel('')
          setDate('')
          setTime('')
          Alert.alert('Apontamento Registrado com Sucesso!')
          setIsLoading(false)
        }).catch((error) => {
          setIsLoading(false)
          throw new Error('Erro Não foi possível registrar Apontamento')
        })
      } else {
        setIsLoading(false)
        Alert.alert('Não é possível realizar apontamento', 'Qtd de Horas por Centro de custo foi Excedido.')
      }


    } else {
      setIsLoading(false)
      Alert.alert('Não é possível realizar apontamento nesse dia', 'Qtd de Horas por dia foi Excedido.')
    }

  }


  return (


    <Stack style={styles.container}>


      <Header title={' Apontamento'} />
      <ScrollView style={styles.scrolView} >
        {/* <View style={styles.container}> */}
        <View >
          <Text style={styles.labelColabora}>Colaborador</Text>
          <NBInput
            fontSize={18}
            borderColor={'gray.300'}
            bgColor={'gray.100'}
            width={'100%'}
            placeholder='Colaborador'
            onChangeText={setColaborador}
            value={userData.usr_nome}
            editable={false}

          />
        </View>

        <View style={styles.dropContainer} >
          <Text style={styles.labelDrop}>PV/Cliente</Text>
          <Dropdown
            style={[styles.dropdown, isFocusPv && { borderWidth: 1, borderColor: colors.purple[200] }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={filteredPv}
            labelField={'pvCliente'}
            valueField={'idPV'}
            search
            maxHeight={200}
            placeholder={!isFocusPv ? 'Select item...' : '...'}
            searchPlaceholder="Search..."
            value={pvSel === '' ? 'Select item...' : pvSel}
            onFocus={() => setIsFocusPv(true)}
            onBlur={() => setIsFocusPv(false)}
            onChange={item => {
              setPvSel(item.idPV);
              setIsFocusPv(false);
            }}
            renderLeftIcon={() => (
              null // for render icon ...
            )} />
        </View>

        <View style={styles.dropContainer}>
          <Text style={styles.labelDrop}>Centro de Custo</Text>
          <Dropdown
            style={[styles.dropdown, isFocusCc && { borderWidth: 1, borderColor: colors.purple[200] }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={filteredCc}
            search
            maxHeight={200}
            labelField="cc"
            valueField="idcc"
            placeholder={!isFocusCc ? 'Select item...' : '...'}
            searchPlaceholder="Search..."
            value={ccSel === '' ? 'Select item...' : ccSel}
            onFocus={() => setIsFocusCc(true)}
            onBlur={() => setIsFocusCc(false)}
            onChange={item => {
              setCcSel(item.idcc);
              setIsFocusCc(false);
            }}
            renderLeftIcon={() => (
              null// for render icon ...
            )}
          />
        </View>

        <View style={styles.containerInputDate}>
          <Text style={{ fontSize: 20 }}>Data do Registro: </Text>
          <TextInputMask
            type='datetime'
            style={[styles.inputDate, isValid ? { borderColor: 'gray' } : { borderColor: 'red' }]}
            value={date}
            onBlur={handleDateChange}
            onChangeText={setDate}
            placeholder="dd/mm/yyyy"
            keyboardType="numeric"
            maxLength={10}
            onFocus={() => { setDate('') }}
          />
        </View>

        <View style={styles.containerInputHour}>
          <Text style={{ fontSize: 20 }} >Quantidade Horas: </Text>
          <TextInputMask
            style={[styles.inputHours, isValidHour ? { borderColor: 'gray' } : { borderColor: 'red' }]}
            type="datetime"
            ref={refInputHours}
            options={{
              format: 'HH:mm',
            }}
            value={time}
            onChangeText={setTime}
            onBlur={handleBlur}
            onFocus={() => setTime('')}
            placeholder="hh:mm"
            keyboardType="numeric"
            maxLength={5}
          />
        </View>
        <View style={styles.buttonContainer}>

          <Button
            h={50}
            bgColor={colors.purple[300]}
            _pressed={{ bg: colors.purple[100] }}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? <Loading color={colors.white} bgColor={colors.purple[300]} /> : <Text style={{ fontSize: 20, color: 'white' }} >Registrar</Text>}
          </Button>
        </View>

      </ScrollView >


    </Stack >
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#fff',

    // alignItems: 'center'
  },
  scrolView: {
    flex: 1,
    paddingHorizontal: '3%',
    paddingTop: '10%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 80
  },
  buttonContainer: {
    marginTop: '15%',
    width: '100%',
    marginBottom: '15%'
  },
  button: {
    width: '100%',
    height: 40,
  },
  containerDrop: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: '10%',
  },
  dropContainer: {

    width: '100%',
    marginTop: '10%',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,

  },
  icon: {
    marginRight: 5,
  },
  label: {
    content: '',
    position: 'relative',
    display: 'flex',
    marginRight: 250,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 20,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  input: {
    width: '100%',
    marginVertical: 5,
  },
  labelDrop: {
    fontSize: 20,
    marginVertical: 3,

  },

  containerInputHour: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginTop: '10%',
  },
  containerInputDate: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginTop: '12%',
  },
  labelInputHour: {
    fontSize: 20,
  },
  inputHours: {
    width: 100,
    height: 40,
    fontSize: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  inputDate: {
    width: 120,
    height: 40,
    fontSize: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: '#fff'
  },
  colaboradorContainer: {
    marginTop: '5%',
  },
  labelColabora: {
    fontSize: 20,
  },

});