import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TextInput, Button } from 'react-native'
import React, { useState, useCallback } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import CalendarPicker from 'react-native-calendar-picker';
import { ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Header from '../../component/Header';
import ProfileHeader from '../../component/ProfileHeader';




const { width, height } = Dimensions.get('window');

const NewLeave = ({ navigation }: any) => {
    // USESTATE FOR PICKER----------------

    const [selectedValue, setSelectedValue] = useState('');
    // USESTATE FOR PICKER ENDED----------------





    // USESTATE FOR TEXTINPUT----------------
    const [remark, setRemark] = useState('');
    const [leave, setLeave] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const handleDateChange = (date, type) => {
        if (type === 'START_DATE') {
            setStartDate(date);
        } else if (type === 'END_DATE') {
            setEndDate(date);
        }
    };



    // USESTATE FOR TEXTINPUT ENDED----------------



    // USESTATE FOR CALENDAR ----------------




    // USESTATE FOR CALENDAR ENDED----------------



    // USESTATE FOR DOCUMENT PICKER----------------


    const [fileResponse, setFileResponse] = useState([]);

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
            });
            setFileResponse(response);
        } catch (err) {
            console.warn(err);
        }
    }, []);



    // USESTATE FOR DOCUMENT PICKER----------------


    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <ProfileHeader showBackIcon={true} title='New Leave' showBellIcon={true} />
            <ScrollView>
                <View style={styles.formView}>
                    <View style={styles.leaveTypeView}>
                        <Text style={styles.leaveType}>Leave Type</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                style={styles.leaveTypeOptions}
                                selectedValue={selectedValue}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Leave Type" value="option1" style={styles.pickerItems} />
                                <Picker.Item label="Option 2" value="option2" style={styles.pickerItems} />
                                <Picker.Item label="Option 3" value="option3" style={styles.pickerItems} />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.leaveTypeView}>
                        <Text style={styles.leaveType}>Leave Reason</Text>
                        <View>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(txt) => setLeave(txt)}
                                placeholder='Leave Reason'
                                multiline={true}
                                value={leave}
                            />
                        </View>

                        <View style={styles.dateWrite}>
                            <View style={styles.startDateView}>
                                <Text style={styles.dateHead}>Start Date</Text>
                                <TextInput
                                    style={styles.startDate}
                                    onChangeText={(txt) => setStartDate(txt)}
                                    value={startDate}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={styles.endDateView}>
                                <Text style={styles.dateHead}>End Date</Text>
                                <TextInput
                                    style={styles.endDate}
                                    onChangeText={(text) => setEndDate(text)}
                                    value={endDate}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        <View style={styles.calendarContainer} >
                            <CalendarPicker
                                startFromMonday={true}
                                allowRangeSelection={true}
                                selectedStartDate={startDate}
                                selectedEndDate={endDate}
                                onDateChange={handleDateChange}
                                width={width * 0.8} // Set the calendar width as needed
                                height={width * 0.6}
                            />
                        </View>
                        <View style={styles.leaveTypeView}>
                            <Text style={styles.leaveType}>Attachment</Text>
                            <View style={styles.attachmentView}>
                                <TouchableOpacity style={styles.attachmentButton} onPress={handleDocumentSelection} >
                                    <Text style={styles.attachmentButtonText}>Select File</Text>
                                </TouchableOpacity>
                                {fileResponse.map((file, index) => (
                                    <Text
                                        key={index.toString()}
                                        style={styles.uri}
                                        numberOfLines={1}
                                        ellipsizeMode={'middle'}>
                                        {file?.uri}
                                    </Text>
                                ))}
                            </View>
                        </View>
                        <View style={styles.leaveTypeView}>
                            <Text style={styles.leaveType}>Remark</Text>
                            <View>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={(txt) => setRemark(txt)}
                                    placeholder='Remark'
                                    multiline={true}
                                    value={remark}
                                    numberOfLines={4}
                                />
                            </View>
                        </View>

                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.process}>
                        <Text style={styles.processText}>Apply Leave</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default NewLeave

const styles = StyleSheet.create({
    formView: {
        backgroundColor: '#F5F5F5',
        marginTop: '20%',
        marginBottom: 30,
        marginHorizontal: '5%',
        padding: 15,
        borderColor: '#DADADA',
        borderWidth: 1.5,
        borderRadius: 20,
        paddingBottom: 40,

    },
    leaveTypeView: {
        marginTop: 20,
    },

    leaveType: {
        color: '#484A4B',
        fontSize: width * 0.045,
        fontWeight: '600',
        marginBottom: 5,
    },
    pickerContainer: {
        borderWidth: 1.5,
        borderColor: '#DADADA',
    },

    leaveTypeOptions: {
        backgroundColor: 'white',
    },
    pickerItems: {
        color: '#969393',
        fontSize: width * 0.04,
        paddingHorizontal: 0,  // Remove horizontal padding
        paddingVertical: 0,
    },
    textInput: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1.5,
        borderColor: '#DADADA',

    },
    dateWrite: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 50,
        justifyContent: 'space-between',

    },
    dateHead: {
        color: '#484A4B', fontSize: width * 0.03, fontWeight: '600'
    },
    startDateView: {
        width: '40%'
    },
    startDate: {
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingVertical: 0,
        borderWidth: 1.5,
        borderColor: '#DADADA',
    },
    endDateView: {
        width: '40%'
    },
    endDate: {
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingVertical: 0,
        borderWidth: 1.5,
        borderColor: '#DADADA',
    },

    calendarContainer: {
        width: '100%',
        marginTop: 20,
        backgroundColor: 'white',
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#DADADA',
        borderRadius: 5,

    },
    attachmentView: {
        display: 'flex', flexDirection: 'row',
    },
    attachmentButton: {
        alignSelf: 'flex-start',
        marginRight: 5,
        backgroundColor: 'white',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderWidth: 0.5,
        borderColor: '#BCBCBC'
    },
    attachmentButtonText: {
        color: '#969393'
    },
    uri: {
        width: '66%',
        alignSelf: 'center',
    },
    process: {
        backgroundColor: '#EBE206',
        width: width * 0.5,
        // marginLeft: '25%',
        alignSelf: 'center',

        padding: 10,
        borderRadius: 10,
        marginBottom: 30,
    },
    processText: {
        color: 'black',
        alignSelf: 'center',
        fontSize: width * 0.045,
        fontWeight: '600',

    },
})