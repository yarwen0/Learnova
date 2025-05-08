import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Colors from './../../constant/Colors'

export default function Explore() {
    return (
        <SafeAreaView>
            <View style={{
                padding: 25,
                backgroundColor: Colors.WHITE,
                height: '100%'
                }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 30
                }}>Explore More Courses</Text>
            </View>
        </SafeAreaView>
    )
}