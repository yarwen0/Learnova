import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

export default function CourseListGrid({ courseList, option }) {
  return (
    <View>
        <FlatList 
            data={courseList}
            
            renderItem={({item, index})=>(
                <View key={index}>
                  <Image source={option?.icon} style={{
                    width: 100,
                    height: 100
                  }}/>
                 </View>
            )} 
        />
    </View>
  )
}