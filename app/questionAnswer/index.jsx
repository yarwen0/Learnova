import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import Colors from '../../constant/Colors';

export default function QuestionAnswer() {
    const {courseParams} = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    const qaList = course?.qa
  return (
    <SafeAreaView>
    <View>
      <Image
        source={require("./../../assets/images/wave.png")}
            style={{
                height: 800,
                width: "100%",
            }}
        />
        <View style={{
            position: 'absolute',
            width: '100%',
            padding: 20
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25,
                color: Colors.WHITE
            }}>Question & Answers</Text>
            <Text>{course?.courseTitle}</Text>

        </View>
    </View>
    </SafeAreaView>
  )
}