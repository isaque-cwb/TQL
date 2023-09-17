import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, ScrollView, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInputMask } from 'react-native-masked-text';
import { useTheme, Button } from 'native-base';
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
  "CLT/PJ": string
  idUsuario: string
}

type ccProps = {
  value: string;
  label: string;
  idcc: string,
  cc: string
  idpv: string
}

type soliProps = {
  idSoli: number,
  RLPV: string,
  idCC: string
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
        const CLTPJ = item['CLT/PJ']
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

        return {
          cc,
          idcc,
          idpv
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


    api.post(`/Ftimesheet-create.rule?action=open&sys=MOB&fld_dt_tlanca=${dataRegFormat}&fld_dt_tlancarg=${date}&fld_ds_tlancatp=1&fld_rl_tsoli=${filteredSoli[0].idSoli}&fld_hh_tlancahora=${time}`).then(() => {
      setCcSel('')
      setPvSel('')
      setDate('')
      setTime('')
      Alert.alert('Apontamento Registrado com Sucesso!')
    }).catch((error) => {
      throw new Error('Erro Não foi possível registrar Apontamento')
    })

  }


  return (


    <View style={[styles.container]}>
      {/*<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>*/}
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{ flex: 1 }}> */}
      <Header title={' Apontamento'} />

      <ScrollView style={{ paddingLeft: '10%' }} >
        {/* <View style={styles.container}> */}
        <View style={styles.colaboradorContainer} >
          <Text style={styles.labelColabora}>Colaborador</Text>
          <NBInput
            fontSize={18}
            borderColor={'gray.300'}
            bgColor={'gray.100'}
            width={'90%'}
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
            placeholder="dd/MM/yyyy"
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

          >
            {isLoading ? <Loading color={colors.white} bgColor={colors.purple[300]} /> : <Text style={{ fontSize: 20, color: 'white' }} >Registrar</Text>}
          </Button>
        </View>

        {/* </View > */}
      </ScrollView >
      {/* </TouchableWithoutFeedback> */}
      {/* </KeyboardAvoidingView > */}
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    // alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 80
  },
  buttonContainer: {
    marginTop: '10%',
    width: '90%',
  },
  button: {
    width: '90%',
    height: 40,
  },
  containerDrop: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: '10%',
  },
  dropContainer: {
    width: '90%',
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
    width: '90%',
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
    width: '90%',
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
    width: '90%',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginTop: '10%',
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