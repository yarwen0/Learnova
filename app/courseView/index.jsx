import { View, Text, Image } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { imageAssets } from '../../constant/Option';

export default function CourseView() {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams)

  return(
    <View>
        <Image source={imageAssets[course?.banner_image]}
                    style={{
                        width: '100%'
                    }}
                />
      </View>
  )
}