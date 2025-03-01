import React, { useContext } from 'react';
import { UserDetailContext } from './../../context/UserDetailContext';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <View>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 25,
        }}>
          Hello, {userDetail?.name || 'User'}
        </Text>
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 17,
        }}>
          Let's Get Started!
        </Text>
      </View>
      <TouchableOpacity onPress={() => setUserDetail({ name: 'New User' })}>
        <Ionicons name="settings-outline" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
}
