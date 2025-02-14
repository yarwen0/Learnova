import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import React, { useContext, useState } from 'react';
import Colors from './../../constant/Colors';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { UserDetailContext } from '../../context/UserDetailContext';

export default function SignUp() {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setUserDetail } = useContext(UserDetailContext);

    const CreateNewAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (resp) => {
                const user = resp.user;
                console.log("User Created:", user);
                await SaveUser(user);
            })
            .catch((e) => {
                console.log(e.message);
            });
    };

    const SaveUser = async (user) => {
        const data = {
            name: fullName,
            email: email,
            member: false,
            uid: user?.uid
        };

        console.log("Saving User Data:", data);  // Log data being saved

        await setDoc(doc(db, 'users', email), data);

        setUserDetail(data);  // Update context with user data
        console.log("User Detail Context after Save:", data); // Log context update

        // Navigate to Home screen or another screen after successful signup
        router.push('/home');  // Change this to wherever you want to navigate
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
            }}>Create New Account</Text>

            <TextInput
                placeholder='Full Name'
                value={fullName}
                onChangeText={(value) => {
                    console.log("Full Name Input:", value);  // Log the input value
                    setFullName(value);
                }}
                style={styles.TextInput}
            />
            <TextInput
                placeholder='Email'
                value={email}
                onChangeText={(value) => {
                    console.log("Email Input:", value);  // Log the email input
                    setEmail(value);
                }}
                style={styles.TextInput}
            />
            <TextInput
                placeholder='Password'
                value={password}
                onChangeText={(value) => {
                    console.log("Password Input:", value);  // Log the password input
                    setPassword(value);
                }}
                secureTextEntry={true}
                style={styles.TextInput}
            />
            <TouchableOpacity
                onPress={CreateNewAccount}
                style={{
                    padding: 15,
                    borderRadius: 10,
                    backgroundColor: Colors.PRIMARY,
                    marginTop: 25,
                    width: '100%'
                }}
            >
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20,
                    color: Colors.WHITE,
                    textAlign: 'center'
                }}>
                    Create Account
                </Text>
            </TouchableOpacity>
            
            <View style={{
                display: 'flex',
                flexDirection: 'row', gap: 5,
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: 'outfit'
                }}>Already have an account?</Text>

                <Pressable 
                    onPress={() => router.push('/auth/signIn')}
                >
                    <Text style={{
                        color: Colors.PRIMARY,
                        fontFamily: 'outfit-bold'
                    }}>
                        Sign In Here
                    </Text>
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
