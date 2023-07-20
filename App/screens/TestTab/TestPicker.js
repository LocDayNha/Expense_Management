import React, { useState, useCallback } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';

const App = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedMonthYear, setSelectedMonthYear] = useState('');
  const [year, setYear] = useState('')
  const showPicker = useCallback((value) => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      //setDate(selectedDate);
      const formattedDate = moment(selectedDate).format('YYYY-MM');
      setDate(formattedDate);
      setSelectedMonthYear(formattedDate);
      const formattedYear = moment(selectedDate).format('YYYY');
      setYear(formattedYear)
      console.log(formattedDate);
      console.log(formattedYear);
      console.log(currentDate);
    },
    [date, showPicker],
  );

  const currentDate = moment().format('YYYY-MM-DD');
  const currentDate2 = moment().format('YYYY-MM-DD-dddd');

  return (
    <SafeAreaView>
      <Text>Month Year Picker Example</Text>
      <Text>{currentDate}</Text>

      <Text>Selected Month Year: {selectedMonthYear}</Text>
      <Text >Selected Year:{year}</Text>
      <TouchableOpacity onPress={() => showPicker(true)}>
        <Text>OPEN</Text>
      </TouchableOpacity>
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={new Date()}
          maximumDate={new Date(2030, 12)}
          locale="vn"
        />
      )}
    </SafeAreaView>
  );
};

export default App;