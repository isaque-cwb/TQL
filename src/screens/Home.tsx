import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { Center, useTheme } from 'native-base';
import { Input as NBInput } from '../components/Input'
import { Header } from '../components/Header';
import { useUser } from '../contexts/auth';
import api from '../services/api';


export function Home() {
  const [pvCli, setPvCli] = useState('');
  const [cc, setCc] = useState('');
  const [colaborador, setColaborador] = useState('')
  const [isFocus, setIsFocus] = useState(false);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isValidHour, setIsValidHour] = useState(true);
  const refInputHours = useRef(null)
  const { userData, updateUser } = useUser()
  const { colors } = useTheme()


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


  const handleDateChange = () => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(200\d|201[0-9]|202[0-9]|203[0-9]|2040)$/;

    if (date) {
      if (!dateRegex.test(date)) {
        console.log(date)
        setIsValid(false)
        setDate('')
        Alert.alert('ERRO', 'Informe uma Data válida.')
      } else {
        setIsValid(true)
      }
    }

  };


  useEffect(() => {
    // buscar dados para o pv e centro e centro de custo


  }, [])


  const data = [
    { label: '', value: '' },
    { label: 'PV-101328 - Irani', value: '1' },
    { label: 'PV-101326 - Klabin', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];


  return (
    <View style={styles.container}>
      <Header title={' APONTAMENTO'} />
      <View  >
        <Text style={styles.labelColabora}>Colaborador</Text>
        <NBInput
          fontSize={18}
          borderColor={'gray.300'}
          bgColor={'gray.200'}
          width={'90%'}
          placeholder='Colaborador'
          onChangeText={setColaborador}
          value={userData.usr_nome}
          editable={false}

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

      <View style={styles.dropContainer} >
        <Text style={styles.labelDrop}>PV/Cliente</Text>

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item...' : '...'}
          searchPlaceholder="Search..."
          value={pvCli === '' ? 'Select item...' : pvCli}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setPvCli(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            null// for render icon ...
          )}
        />
      </View>

      <View style={styles.dropContainer}>
        <Text style={styles.labelDrop}>Centro de Custo</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item...' : '...'}
          searchPlaceholder="Search..."
          value={cc === '' ? 'Select item...' : cc}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCc(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            null// for render icon ...
          )}
        />
      </View>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 80
  },
  button: {
    width: '90%',
    height: 40
  },
  containerDrop: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropContainer: {
    width: '90%'
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
    marginTop: 12
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
  labelColabora: {
    fontSize: 20,


  },

});