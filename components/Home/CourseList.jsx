import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import {imageAssets} from './../../constant/Option'

export default function CourseList({ courseList }) {

  return (
    <View style={{
      marginTop: 15
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25
      }}>Courses</Text>

      <FlatList 
        data={courseList}
        renderItem={({ item,index }) => (
          <View key={index}>
            <Text>{item?.courseTitle}</Text>
          </View>
        )}
      />
    </View>
  )
}