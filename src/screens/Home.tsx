import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { Center } from 'native-base';


export function Home() {
  const [value, setValue] = useState('');
  const [colaborador, setColaborador] = useState('')
  const [isFocus, setIsFocus] = useState(false);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isValidHour, setIsValidHour] = useState(true);
  const refInputHours = useRef(null)


  const handleBlur = () => {
    // Verifica se o valor inserido está no formato "hh:mm"
    const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;

    if (time) {
      if (!timeRegex.test(time)) {
        setTime('');
        Alert.alert('ERRO', 'Informe uma quantidade de horas válida.');
        setIsValidHour(false)
      } else {
        const [hours, minutes] = time.split(':');
        const hoursInt = parseInt(hours, 10);
        const minutesInt = parseInt(minutes, 10);

        if (hoursInt >= 12 && minutesInt > 0) {
          setTime('');
          Alert.alert('Erro na quantidade de horas', 'Informe até no máximo 12 horas.');
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


  const data = [
    { label: '', value: '' },
    { label: 'PV-100138 - Irani', value: '1' },
    { label: 'PV-200236 - Klabin', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page Home</Text>
      <View  >
        <TextInput
          style={styles.input}
          label={'Colaborador'}
          mode='outlined'
          onChangeText={setColaborador}
          value={colaborador}
        />
      </View>
      <View >
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
          value={value === '' ? 'Select item...' : value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            null// for render icon ...
          )}
        />
      </View>

      <View style={styles.containerInputHour}>
        <Text style={{ fontSize: 18 }} >Informe Qtd de Horas: </Text>
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
      <View style={styles.containerInputDate}>
        <Text style={{ fontSize: 18 }}>Informe uma Data: </Text>
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

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  button: {
    width: 300,
    height: 40
  },
  containerDrop: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    width: 300
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
    width: 300,
    marginVertical: 5,
  },
  labelDrop: {
    fontSize: 20,
    marginVertical: 3,

  },
  containerDatePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    width: 300,
    justifyContent: 'space-between',


  },
  containerInputHour: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    width: 300,
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
    width: 300,
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

});