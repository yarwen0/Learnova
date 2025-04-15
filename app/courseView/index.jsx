import { View, Text, Image } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { imageAssets } from '../../constant/Option';
import Intro from '../../components/CourseView/intro';
import Colors from '../../constant/Colors';
import Chapters from '../../components/CourseView/Chapters';

export default function CourseView() {

  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);

  return(
    <View style={{
        flex: 1,
        backgroundColor: Colors.WHITE
    }}>
        <Intro course={course} />
        <Chapters course={course} />
    </View>
  )
}