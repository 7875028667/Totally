import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';

interface Props {
    title: string;
    showBellIcon: boolean;
}


const Header: FC<Props> = ({ title, showBellIcon }) => {
    const navigation = useNavigation()

    return (
        <View style={styles.headerBox} >
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <IonIcon name="arrow-back" color={'white'} size={width * 0.07} />
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>

            {showBellIcon && <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                <IonIcon name="notifications" color={'white'} size={22} />
            </TouchableOpacity>}
        </View>

    )
}

export default Header

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    headerBox: {
        backgroundColor: '#49AA67',
        height: height * 0.17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5

    },
    title: {
        flex: 1,
        color: 'white',
        fontSize: width * 0.055,
        textAlign: 'center',
        paddingRight: width * 0.05,


    },
});
