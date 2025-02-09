import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import Colors from './../../constant/Colors'
import {useRouter} from 'expo-router'

export default function SignUp() {
    const router = useRouter();
    const [fullName, setFullName] = useState();
    return (
        <View style={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: 100,
            padding: 25,
            flex:1,
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

            <TextInput placeholder='Full Name' style={styles.TextInput}/>
            <TextInput placeholder='Email' style={styles.TextInput}/>
            <TextInput placeholder='Password' secureTextEntry={true} style={styles.TextInput}/>
            <TouchableOpacity
            style={{
                padding: 15,
                borderRadius: 10,
                backgroundColor: Colors.PRIMARY,
                marginTop: 25,
                width: '100%'
            }}>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20,
                    color: Colors.WHITE,
                    textALign: 'center'
                }}>Create Account</Text>

            </TouchableOpacity>
            
            <View style={{
                display:'flex',
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
                    }}>Sign In Here</Text>
                </Pressable>
            </View>
        </View>
    )
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

})