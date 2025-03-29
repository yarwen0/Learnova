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
        horizontal={true}
        renderItem={({ item,index }) => (
          <View key={index} style={styles.courseContainer}>
            <Image source={imageAssets[item.banner_image]} 
              style={{
                width: 260,
                height: 150,
                borderRadius: 15
              }}
            />
            <Text>{item?.courseTitle}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  courseContainer:{


  }
})