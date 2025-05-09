// app/screens/Profile.jsx
import React, { useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { auth } from './../../config/firebaseConfig';
import { signOut } from 'firebase/auth';
import { UserDetailContext } from '../../context/UserDetailContext';
import { ProfileMenu } from '../../constant/Option';

export default function Profile() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();

  const menuItems = ProfileMenu.filter(item => item.name !== 'My Subscription');

  const onMenuClick = (item) => {
    if (item.name === 'Logout') {
      signOut(auth)
        .then(() => {
          setUserDetail(null);
          router.push('/');
        })
        .catch(err => console.warn(err));
    } else {
      router.push(item.path);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Profile</Text>

        <Image
          source={require('../../assets/images/landing.png')}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {userDetail?.name}
        </Text>
        <Text style={styles.email}>
          {userDetail?.email || 'admin@tubeguruji.com'}
        </Text>

        <View style={styles.menu}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.name}
              style={styles.menuItem}
              onPress={() => onMenuClick(item)}
            >
              <Ionicons
                name={item.icon}
                size={28}
                color="#4F8EF7"
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, alignItems: 'center' },
  header: {
    alignSelf: 'flex-start',
    fontFamily: 'outfit-bold',
    fontSize: 32,
    marginBottom: 20,
  },
  avatar: {
    width: 200,        // was 100
    height: 200,       // was 100
    borderRadius: 12,  // keeps it rounded
    marginBottom: 20,
  },
  name: {
    fontFamily: 'outfit-bold',
    fontSize: 28,
  },
  email: {
    fontFamily: 'outfit-regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  menu: { width: '100%' },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,   // bigger box
    paddingHorizontal: 16, // more touch area
    borderRadius: 12,
    backgroundColor: '#F2F2F2',
    marginBottom: 16,
  },
  menuIcon: { marginRight: 16 },
  menuText: {
    fontFamily: 'outfit-medium',
    fontSize: 18,         // slightly larger text
  },
});
