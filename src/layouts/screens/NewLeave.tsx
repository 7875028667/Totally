import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Pressable, TextInput, Button } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Header from '../../component/Header';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getMethod, postMethod } from '../../utils/helper';
import Loader from '../../component/Loader';




const { width, height } = Dimensions.get('window');
const dropDownData = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
]

const NewLeave = ({ navigation }: any) => {
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(false)
    const [leave, setLeave] = useState('');
    const [leaveType, setLeaveType] = useState([])
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<string[] | null>(null)
    const [remark, setRemark] = useState('');

    useEffect(() => {
        getLeaveType()
    }, [])

    const getLeaveType = async () => {
        try {
            setLoading(true)
            const api: any = await getMethod(`api/leavet-type-list`)
            setLeaveType(api.data.data.leaveType)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log('error',error);
        }
    }


    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };

    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setStartDatePickerVisibility(false);
        setEndDatePickerVisibility(false);
    };

    const handleStartDateConfirm = (date: string) => {
        setStartDatePickerVisibility(false);
        setStartDate(date);
    };

    const handleEndDateConfirm = (date: string) => {
        setEndDatePickerVisibility(false);
        setEndDate(date);
    }

    const selectDocument = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setSelectedFile(result)
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                console.log('userCancel Image')
            } else {
                console.log('error', error)
            }
        }
    }


    const ApplyLeaveHandler = async() =>{
        try {
            setLoading(true)
            const data = {
                leave_type_id: value,
                leave_reason: leave,
                start_date: startDate,
                end_date: endDate,
                remark: remark,
                attachment: selectedFile,

            }
            const api:any = await postMethod(`api/apply-leave`,data)
            // console.log('apijdjfjdfbjd',api);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log('error',error);
            
        }
    }


    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <Header title='New Leave' showBellIcon={false} />
            <ScrollView>
                <View style={styles.formView}>
                    <View style={styles.leaveTypeView}>
                        <Text style={styles.leaveType}>Leave Type</Text>
                        <Pressable style={styles.pickerContainer}>
                            <Dropdown
                                placeholder='Leave Type'
                                data={leaveType}
                                placeholderStyle={styles.pickerItems}
                                selectedTextStyle={styles.leaveTypeOptions}

                                iconStyle={styles.dropDowniconStyle}
                                maxHeight={300}
                                labelField="type_name"
                                valueField="leave_type_id"
                                value={value}
                                onChange={(item) => {
                                    setValue(item.leave_type_id);
                                }}
                            />
                        </Pressable>
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

                        <View style={styles.startAndEndDateContainer}>
                            <View>
                                <Text style={styles.leaveType}>Start Date</Text>
                                <Pressable style={styles.startDateBox} onPress={showStartDatePicker}>
                                    <Text style={styles.selectedDate}>{startDate ? startDate.toDateString() : 'Select Start Date'}</Text>
                                </Pressable>
                            </View>

                            <View>
                                <Text style={styles.leaveType} >End Date</Text>
                                <Pressable style={styles.startDateBox} onPress={showEndDatePicker}>
                                    <Text style={styles.selectedDate}>{endDate ? endDate.toDateString() : 'Select End Date'}</Text>
                                </Pressable>
                            </View>

                            <DateTimePickerModal
                                isVisible={isStartDatePickerVisible}
                                mode="date"
                                onConfirm={handleStartDateConfirm}
                                onCancel={hideDatePicker}
                            />
                            <DateTimePickerModal
                                isVisible={isEndDatePickerVisible}
                                mode="date"
                                onConfirm={handleEndDateConfirm}
                                onCancel={hideDatePicker}
                            />
                        </View>

                        <View style={styles.leaveTypeView}>
                            <Text style={styles.leaveType}>Attachment</Text>

                            <View style={styles.attachmentView}>
                                <Pressable style={styles.attachmentButton} onPress={() => selectDocument()}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.chooseyourfilebox}>
                                            <Text numberOfLines={1}
                                                ellipsizeMode="tail" style={styles.attachmentButtonText}>{selectedFile ? selectedFile[0].name : 'Choose File'}</Text>
                                        </View>
                                    </View>
                                </Pressable>
                                <Text style={styles.nofilechossenText}>{!selectedFile && 'No File Chosen'}</Text>

                            </View>
                            <Text style={{ fontSize: 12, fontFamily: 'Roboto', fontWeight: '600' }}>Upload files only: pdf,gif,png,jpg,jpeg</Text>
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
                <View>
                    <TouchableOpacity style={styles.process} onPress={ApplyLeaveHandler}>
                        <Text style={styles.processText}>Apply Leave</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Loader visible={loading} />
        </View>
    )
}

export default NewLeave

const styles = StyleSheet.create({
    formView: {
        backgroundColor: '#F5F5F5',
        marginTop: '10%',
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
        backgroundColor: 'white',
        paddingVertical: 3,
        borderWidth: 1.5,
        borderColor: '#DADADA',
    },

    leaveTypeOptions: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        fontSize: width * 0.035,
        fontWeight: '600',
        color: '#484A4B',
    },
    pickerItems: {
        paddingHorizontal: 10,
        fontSize: 14
    },
    dropDowniconStyle: {
        width: 26,
        height: 26,
        backgroundColor: 'white',
        borderRadius: 13,

    },
    textInput: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1.5,
        borderColor: '#DADADA',

    },
    startAndEndDateContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    startDateText: {
        fontSize: width * 0.03,
        fontWeight: '600',
        color: '#484A4B',
    },
    startDateBox: {
        height: 30,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#484A4B',
        width: 130,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedDate: {

        fontSize: 14,
        fontWeight: '400',
        color: '#484A4B',
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    attachmentButton: {
        height: 30,
        width: 120,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginTop: 5,
        borderWidth: 0.5,
        borderColor: '#BCBCBC',
        alignItems: 'center'
    },
    chooseyourfilebox: {
        textAlign: 'center',
        color: 'black'
    },
    nofilechossenText: {
        fontWeight: '400',
        fontSize: 12,
        color: 'black',
        marginLeft: 20
    },

    attachmentButtonText: {
        color: 'black',
        fontSize: 14,
        fontWeight: '400',

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