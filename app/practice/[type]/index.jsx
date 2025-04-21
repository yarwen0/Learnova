import { View, Text, Image, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { imageAssets, PraticeOption } from '../../../constant/Option';
import Colors from '../../../constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PracticeTypeHomeScreen() {
    const router = useRouter();
    const {type} = useLocalSearchParams();
    const option = PraticeOption.find(item => item.name==type);
  return (
    <SafeAreaView>
        <View>
            <Image source = {option.image} style={{
                height: 200,
                width: '100%'
            }}/>
            <View style={{
                position: 'absolute',
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center'
            }}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" style={{
                        backgroundColor: Colors.WHITE,
                        padding: 8,
                        borderRadius: 10
                    }}/>
                </Pressable>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 35,
                    color: Colors.WHITE
                }}>{type}</Text>
            </View>
        </View>
    </SafeAreaView>

  )
}