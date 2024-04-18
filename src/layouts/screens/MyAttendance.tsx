import { StyleSheet, Text, View, Image, Dimensions, Button, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Header from '../../component/Header';




const { width, height } = Dimensions.get('window');


const MyAttendance = ({ navigation }: any) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isPunchedIn, setIsPunchedIn] = useState(false);

  const handlePunchIn = () => {
    // const currentDate = moment().format('YYYY-MM-DD');
    const currentDate = moment().format('DD ddd');
    const currentTime = moment().format('HH:mm');
    const newAttendance = { date: currentDate, punchIn: currentTime, punchOut: '' };
    setAttendanceData([...attendanceData, newAttendance]);
    setIsPunchedIn(true);
  };

  const handlePunchOut = () => {
    const currentTime = moment().format('HH:mm');
    const lastAttendanceIndex = attendanceData.length - 1;
    if (lastAttendanceIndex >= 0 && attendanceData[lastAttendanceIndex].punchOut === '') {
      attendanceData[lastAttendanceIndex].punchOut = currentTime;
      setAttendanceData([...attendanceData]);
    }
    setIsPunchedIn(false);
  };

  const renderAttendanceItem = ({ item }) => (

    // const formattedDate = moment(item.date).format('DD ddd'); // Example: "05 Thu"

    <View style={styles.attendanceItem}>
      <View style={styles.attendance}>
        <View style={styles.date}>
          <Text style={[styles.dateData, { textAlign: 'center' }]}>{item.date}</Text>
        </View>
        <View style={styles.punchIn}>
          <Text style={styles.punchHead}>Punch In:</Text><Text style={styles.dateData}>{item.punchIn}</Text>
        </View>
        <View style={styles.punchOut}>
          <Text style={styles.punchHead}>Punch Out:</Text>
          <Text style={styles.dateData}>
            {item.punchOut !== '' ? (
              item.punchOut
            ) : (
              <Text style={styles.notPunchedOut}>Pending</Text>
            )}
          </Text>
        </View>

      </View>
    </View>
  );

  return (

    <View style={{ height: '100%', backgroundColor: 'white' }}>
      <Header title='My Attendance' showBellIcon={true} />
      
      <View style={{ height: '100%', backgroundColor: 'white' }}>
        <View style={styles.container}>
          {isPunchedIn ? (
            <Button title="Punch Out" onPress={handlePunchOut} />
          ) : (
            <Button title="Punch In" onPress={handlePunchIn} />
          )}
        </View>
        <ScrollView style={styles.flatListContainer}>
          <FlatList
            data={attendanceData}
            renderItem={renderAttendanceItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
    </View>
  );
};


export default MyAttendance

const styles = StyleSheet.create({
  upperView: {
    backgroundColor: '#49AA67',
    height: height * 0.17,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingTop: height * 0.03,
    paddingLeft: width * 0.03,
    paddingRight: width * 0.03,

  },
  icon: {
    alignSelf: 'flex-start',
  },


  // TESTING CSS


  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  attendanceItem: {
    marginBottom: 10,
    width: '90%',
    marginLeft: '5%'
  },
  notPunchedOut: {
    color: 'red',
  },

  attendance: {
    backgroundColor: '#F3F3F3',
    marginBottom: 3,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  date: {
    width: '20%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginRight: '3%',

  },
  punchIn: {
    width: '36%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#484A4B',
    borderRightWidth: 1,


  },
  punchOut: {
    width: '36%',
    paddingHorizontal: 10,
    paddingVertical: 5,

  },
  punchHead: {
    color: 'black',
    fontWeight: '600',

  },
  dateData: {
    color: 'black',
    alignContent: "center",
    textAlign: 'left',
  },
  flatListContainer: {
    // flex: 1,
    height: '100%'
  },

})