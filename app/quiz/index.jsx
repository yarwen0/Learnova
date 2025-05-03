import { View, Text, SafeAreaView, Image, Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constant/Colors';

export default function Quiz() {
    const { courseParams } = useLocalSearchParams();
    const course=JSON.parse(courseParams);
  return (
    <SafeAreaView> 
        <View>
            <Image source={require('./../../assets/images/wave.png')} 
                style={{
                    height: 800,
                    width: "100%"
                }}
            />
            <View style={{
                    position: 'absolute',
                    padding: 25,
                    width: '100%'
                }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'

                }}>
                    <Pressable>
                        <Ionicons name="arrow-back" size={30} color="white" />
                    </Pressable>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 25,
                        color: Colors.WHITE
                    }}>0 of 5</Text>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}