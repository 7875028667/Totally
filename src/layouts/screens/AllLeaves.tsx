import { StyleSheet, Text, View, Dimensions, Image, ScrollView, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../component/Header';
import { getMethod } from '../../utils/helper';
import Loader from '../../component/Loader';
import { useFocusEffect } from '@react-navigation/native';




const { width, height } = Dimensions.get('window');

const AllLeaves = ({ navigation }: any) => {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log('leaveData',leaveData);
  

  useFocusEffect(
    useCallback(() => {
        getData()
    }, [])

)

  const getData = async () => {
    
    try {
      setLoading(true)
      const api: any = await getMethod(`api/leave-list`);
      // console.log('api',api);
      
      if (api.status === 200) {
        setLeaveData(api?.data?.data?.leave)
        setLoading(false)
      }
      else {
        console.log('error in leavelist api status ',api.data.message);
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log('error in leave list api', error);
    }
  }

  const renderLeaveData = ({ item }) => {
    
    return (
      <View style={styles.leavesList}>
        {/* <View style={styles.innerListView}>
          <Text style={styles.idNumber}>ID: {item.empId}</Text>
        </View> */}
        <View style={styles.innerListView}>
          <Text style={styles.leaveReason}>{item.reason}</Text>
          <Text style={styles.leaveStatus}>{item.status === 1 ? 'Pending' : (item.status === 2 ? 'Approved' : 'Cancelled')}</Text>
        </View>
        <View style={styles.innerListView}>
          <Text style={styles.leaveType}>{item.type_name}</Text>
          <Text></Text>
        </View>
        <View style={styles.innerListView}>
          <Text style={styles.leaveForm}><MaterialCommunityIcons name="file-document-edit-outline" size={width * 0.06} color="#565252" /> Leave Form</Text>
          <Text style={styles.leaveDates}>{item.from_date} to {item.to_date}</Text>
        </View>
        <View style={styles.innerListView}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{uri:item.profile_img}} style={styles.managerProfile} />
            <Text style={styles.leaveManager}>Manager</Text>
          </View>
          <Text style={styles.leaveManagerName}>{item.user_name}</Text>
        </View>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <Header title='All Leave' showBellIcon={false} />

      <View style={styles.leaveContainer}>
        <View style={styles.newLeaveBtnView}>
          <TouchableOpacity style={styles.newLeaveBtn} onPress={() => navigation.navigate('NewLeave')}>
            <Text style={styles.newLeaveBtnText}>New Leave</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={leaveData}
          keyExtractor={(item) => item.leave_id}
          renderItem={renderLeaveData}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return(
              <View style={{flex:1,}}>
                <Text style={{textAlign:'center', marginTop: height / 5, fontSize:20, fontWeight:'600', color:'#000000'}}>Leave Not Found</Text>
              </View>
            )
          }}
        />
      </View>
      <Loader visible={loading} />
    </View>
  )
}

export default AllLeaves

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,

  },
  leaveContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 7,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: 50,
    flex: 1

  },
  icon: {
    alignSelf: 'flex-start',
    marginLeft: width * 0.03
  },
  upperView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingTop: height * 0.03,
    paddingLeft: width * 0.03,
    paddingRight: width * 0.03,

  },
  profileImage: {
    width: width * 0.21,
    height: width * 0.2,
    resizeMode: 'cover',
    marginTop: height * 0.01,
  },
  idNo: {
    fontSize: width * 0.03,
    fontWeight: '600',
    color: 'white',
    marginVertical: 5,
    alignSelf: 'center',
  },
  newLeaveBtnView: {
    alignSelf: 'flex-end',
    marginBottom:20
  },
  newLeaveBtn: {
    backgroundColor: '#49AA67',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,

  },
  newLeaveBtnText: {
    color: 'white',
    fontSize: width * 0.038,
  },
  leavesListContainer: {
    marginTop: 10,
    // marginBottom:100,
    paddingBottom: 20
  },
  leavesList: {
    borderWidth: 1,
    borderColor: '#D4D4D4',
    paddingHorizontal: 13,
    paddingVertical: 15,
    borderRadius: 20,
    marginBottom: 15,
  },
  innerListView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    alignItems: 'center',
  },
  idNumber: {
    color: '#49AA67',
    fontSize: width * 0.047,
    fontWeight: '700'
  },
  leaveReason: {
    color: '#656565',
    fontWeight: '600',
    fontSize: width * 0.046,


  },
  leaveStatus: {
    color: '#9A9191',
    fontSize: width * 0.032,
    fontWeight: '700',

  },
  leaveType: {
    color: "#656565",
    fontSize: width * 0.034,
  },
  leaveForm: {
    color: '#656565',
    fontWeight: '600',
    fontSize: width * 0.04,
  },
  leaveDates: {
    color: '#656565',
    fontSize: width * 0.032,
    fontWeight: '500',
  },
  innerListViewManager: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  managerProfile: {
    height: width * 0.1,
    width: width * 0.1,
    borderRadius:width * 0.05,
    marginRight: 10,
  },
  leaveManager: {
    color: '#656565',
    fontWeight: '600',
    fontSize: width * 0.037,
  },

  leaveManagerName: {
    color: "#656565",
    fontSize: width * 0.034,
  },

})


