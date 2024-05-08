import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import moment from 'moment';
import Header from '../../component/Header';
import { getMethod, postMethod } from '../../utils/helper';
import Loader from '../../component/Loader';

const { width } = Dimensions.get('window');

const MyAttendance = ({ navigation }: any) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highlightedMonth, setHighlightedMonth] = useState(moment().format('MMMM'));
  const monthScrollViewRef = useRef(null);
  console.log('attendanceData',attendanceData);
  

  useEffect(() => {
    getAttendanceData();
  }, [highlightedMonth]);

  useEffect(() => {
    // Scroll to the current month when the component mounts
    scrollToCurrentMonth();
  }, []);

  const scrollToCurrentMonth = () => {
    const currentMonthIndex = moment().month();
    const offsetX = currentMonthIndex * width / 3; // Assuming 3 months are visible at a time
    monthScrollViewRef.current.scrollTo({ x: offsetX, animated: true });
  };

  const getAttendanceData = async () => {
    try {
      setLoading(true);
      const month = {
        selected_month: highlightedMonth
      }
      const api: any = await postMethod(`api/attendance`, month);
      if (api.status === 200) {
        setLoading(false)
      } else {
        console.log('something went wrong');
        setLoading(false)
      }
      const formattedData = api?.data.data.attendance.map(item => {
        const formattedDate = moment(item.attendance_date, 'DD-MM-YYYY').format('YYYY-MM-DD');
        return {
          ...item,
          attendance_date: formattedDate,
        };
      });
      setAttendanceData(formattedData);
      const firstAttendanceMonth = moment(formattedData[0].attendance_date).format('MMMM');
      setHighlightedMonth(firstAttendanceMonth);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching attendance data:', error);
      setLoading(false);
    }
  };

  const handleMonthPress = (month) => {
    const filteredData = attendanceData.filter(item => moment(item.attendance_date).format('MMMM') === month);
    setHighlightedMonth(month);
    setAttendanceData(filteredData);
  };

  const handleDate = async (item: any) => {
    try {
      setLoading(true)
      const date = {
        selected_date: item
      }
      const api: any = await postMethod(`api/timesheet`, date)
      if (api.status === 200) {
        navigation.navigate('Timesheet', { data: api?.data.data.attendance })
        setLoading(false)
      } else {
        console.log(api.data.message);
        setLoading(false)
      }

    } catch (error) {
      console.log('error while handledate', error);
      setLoading(false)
    }
  };

  const renderAttendanceItem = ({ item }) => {
    const formattedDate = moment(item.attendance_date, 'YYYY-MM-DD').format('DD-MM-YYYY');
    const parsedDate = moment(formattedDate, 'DD-MM-YYYY').format('DD');
    const parsedDateDay = moment(formattedDate, 'DD-MM-YYYY').format('ddd');
    const isToday = moment().format('DD-MM-YYYY') === formattedDate;
    return(
      <View style={styles.attendance}>
        <Pressable style={[styles.date,isToday && {backgroundColor:'#EBE206'}]} onPress={() => handleDate(formattedDate)}>
          <Text style={[styles.dateData, { textAlign: 'center' }]}>{parsedDate}</Text>
          <Text style={[styles.dateData, { textAlign: 'center',marginTop:5 }]}>{parsedDateDay}</Text>
        </Pressable>
        <View style={styles.punchIn}>
          <Text style={styles.punchHead}>Check In:</Text>
          <Text style={styles.dateData}>{item.clock_in}</Text>
        </View>
        <View style={styles.punchOut}>
          <Text style={styles.punchHead}>Check Out:</Text>
          <Text style={styles.dateData}>{item.clock_out}</Text>
        </View>
      </View>
    )
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      {/* Header */}
      <Header title='My Attendance' showBellIcon={false} />
      <View style={{ paddingVertical: 10 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={monthScrollViewRef} // Reference for ScrollView
        >
          {Array.from({ length: 12 }, (_, i) => moment().month(i).format('MMMM')).map((month, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.monthItem, month === highlightedMonth && styles.highlightedMonth]}
              onPress={() => handleMonthPress(month)}
            >
              <Text style={[styles.month, month === highlightedMonth && styles.highlightedMonthText]}>{month}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={attendanceData}
        renderItem={renderAttendanceItem}
        keyExtractor={(item) => item.id}
      />
      <Loader visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  monthItem: {
    height: 50,
    paddingHorizontal: 40,
    marginTop: 20
  },
  attendance: {
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 25,
    marginVertical: 10,
    marginHorizontal: 15
  },
  date: {
    width: '20%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  punchIn: {
    width: '32%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#484A4B',
    borderRightWidth: 1,
  },
  punchOut: {
    width: '32%',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  punchHead: {
    color: 'black',
    fontWeight: '600',
  },
  dateData: {
    color: 'black',
    alignContent: 'center',
    textAlign: 'left',
  },
  highlightedMonthText: {
    fontWeight: '600',
    color: 'green',
    fontSize: 16
  },
  month:{
    fontWeight: '600',
    color: '#000000',
    fontSize: 16
  }
});

export default MyAttendance;
