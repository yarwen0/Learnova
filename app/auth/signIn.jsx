import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator, Platform } from 'react-native';
import React, { useContext, useState } from 'react';
import Colors from './../../constant/Colors';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext';

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [loading, setLoading] = useState(false);

    const db = getFirestore(); // Initialize Firestore

    const onSignInClick = () => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(async (resp) => {
                const user = resp.user;
                console.log(user);
                await getUserDetail();
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Incorrect Email & Password', ToastAndroid.BOTTOM);
                }
            });
    };

    const getUserDetail = async () => {
        try {
            const result = await getDoc(doc(db, 'users', email));
            if (result.exists()) {
                console.log(result.data());
                setUserDetail(result.data());
            } else {
                console.log('No such user!');
            }
        } catch (e) {
            console.log('Error fetching user details:', e);
        }
    };

    return (
        <View style={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: 100,
            padding: 25,
            flex: 1,
            backgroundColor: Colors.WHITE
        }}>
            <Image source={require('./../../assets/images/logo.png')} 
                style={{
                    width: 180,
                    height: 180,
                    marginBottom: 20
                }}
            />
            <Text style={{
                fontSize: 30,
                fontFamily: 'outfit-bold'
            }}>Welcome Back</Text>

            <TextInput placeholder='Email'
                onChangeText={(value) => setEmail(value)}
                style={styles.TextInput} />
            <TextInput placeholder='Password'
                onChangeText={(value) => setPassword(value)}
                secureTextEntry={true} style={styles.TextInput} />
            <TouchableOpacity
                onPress={onSignInClick}
                disabled={loading}
                style={{
                    padding: 15,
                    borderRadius: 10,
                    backgroundColor: Colors.PRIMARY,
                    marginTop: 25,
                    width: '100%'
                }}>
                {!loading ? <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20,
                    color: Colors.WHITE,
                    textAlign: 'center'
                }}>Sign In</Text> :
                    <ActivityIndicator size={'large'} color={Colors.WHITE} />
                }
            </TouchableOpacity>

            <View style={{
                display: 'flex',
                flexDirection: 'row', gap: 5,
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit'
                }}>Don't have an account?</Text>

                <Pressable
                    onPress={() => router.push('/auth/signUp')}
                >
                    <Text style={{
                        color: Colors.PRIMARY,
                        fontFamily: 'outfit-bold'
                    }}>Create New Here</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    TextInput: {
        borderWidth: 1,
        width: '100%',
        padding: 15,
        fontSize: 18,
        marginTop: 20,
        borderRadius: 8
    }
});
