import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Pressable } from 'react-native';
import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Loader from './Loader';

interface Props {
    showBellIcon?: boolean;
    title?: string;
    showBackIcon?: boolean;
    onPress?: () => void;
    showCamera?: boolean;
    image?: string;
    loading?: boolean;
}

const ProfileHeader: FC<Props> = ({ showBellIcon, title, showBackIcon, showCamera, onPress, image, loading }) => {
    const Navigation = useNavigation();

    return (
        <View style={styles.headerBox}>
            <View style={styles.backIconAndRingIcon}>
                <View style={styles.backIcon}>
                    {showBackIcon && (
                        <TouchableOpacity onPress={() => Navigation.goBack()}>
                            <IonIcon name="arrow-back-outline" color={'white'} size={25} />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.backIcon}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.notificationIcon}>
                    {showBellIcon && (
                        <TouchableOpacity onPress={() => Navigation.navigate('Notification')}>
                            <IonIcon name="notifications" color={'white'} size={22} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={styles.profilePic}>
                {loading ? (
                    <Loader visible={loading} />
                ) : (
                    <>
                        {image ? (
                            <Image
                                source={{ uri: image }}
                                style={{ width: 120, height: 120, borderRadius: 60 }}
                            />
                        ) : (
                            <Image
                                source={require('../Images/profile.png')}
                                style={{ width: 120, height: 120, borderRadius: 60 }}
                            />
                        )}
                    </>
                )}
                {showCamera && (
                    <Pressable style={styles.cameraicon} onPress={onPress}>
                        <IonIcon name='camera-outline' color={'black'} size={30} />
                    </Pressable>
                )}
            </View>
        </View>
    );
}

export default ProfileHeader;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    headerBox: {
        backgroundColor: '#49AA67',
        height: height * 0.17,
    },
    backIconAndRingIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20
    },
    backIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: width * 0.055,
        textAlign: 'center',
    },
    notificationIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profilePic: {
        alignItems: 'center',
        marginTop: '8%'
    },
    cameraicon: {
        position: 'absolute',
        top: 75,
        right: 115
    }
});
