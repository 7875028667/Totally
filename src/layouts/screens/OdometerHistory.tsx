import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import { postMethod } from '../../utils/helper'
import Loader from '../../component/Loader'
import moment from 'moment'

const OdometerHistory = ({ route }) => {
    const historyDatee = route.params
    const nextDayDate = moment(historyDatee?.selectedDatee).format('YYYY-MM-DD');

    const [loading, setLoading] = useState(false)
    const [odometerDetails, setOdometerDetails] = useState([])
    const [apidatamessage, setApidatamessage] = useState('')

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        try {
            setLoading(true)
            const body = {
                date: nextDayDate
            }
            // console.log('body', body);

            const api: any = await postMethod(`api/odometer-details`, body)
            if (api.status === 200) {
                // console.log('apiiii', api.data);
                setApidatamessage(api.data)
                setOdometerDetails(api.data.data)
                setLoading(false)
            } else {
                console.log('error in status of odometerdetails', api.data.message);
                setLoading(false)
            }

        } catch (error) {
            console.log('error in odometer detail api catch', error);
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Header title='Odometer History' showBellIcon={true} />
            {odometerDetails ?
                <ScrollView style={{ marginTop: 20, marginHorizontal: 20 }}>

                    <View>
                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: '#000000' }}>{odometerDetails?.date} Odometer History</Text>
                        <View style={styles.historyBox}>
                            <Text style={styles.startOdometerText}>Start Odometer Distance: {odometerDetails?.start_odometer}</Text>
                            <Text style={styles.startOdometerText}>End Odometer Distance: {odometerDetails?.end_odometer}</Text>
                            <Text style={styles.startOdometerText}>Total Odometer Distance: {odometerDetails?.total_distance}</Text>
                        </View>
                    </View>

                </ScrollView>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.message}>{apidatamessage?.message}</Text>
                </View>
            }
            <Loader visible={loading} />
        </View>
    )
}

export default OdometerHistory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    historyBox: {
        marginTop: 30,
        marginHorizontal: 15,
        backgroundColor: '#F6F6F6',
        borderRadius: 10,
        elevation: 4,
        paddingVertical: 20,
        alignItems: 'center',
        marginBottom: 10
    },
    startOdometerText: {
        marginVertical: 20,
        color: '#000000',
        fontWeight: '600',
        fontSize: 20
    },
    message: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '600',
        color: '#000000'

    }
})