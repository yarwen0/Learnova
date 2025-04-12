import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {imageAssets} from './../../constant/Option'
import { StyleSheet } from 'react-native'
import Colors from '../../constant/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function CourseList({ courseList }) {

  const router = useRouter();

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
        showsHorizontalScrollIndicator={false}
        renderItem={({ item,index }) => (
          <TouchableOpacity 
            onPress={()=> router.push({
              pathname: '/courseView',
              params:{
                courseParams:JSON.stringify(item)
              }

            })}
            key={index} style={styles.courseContainer}>
               <Image source={imageAssets[item.banner_image]}
              style={{
                width: '100%',
                height: 150,
                borderRadius: 15
              }}
            />
            <Text style={{
              fontFamily: 'outfit-bold',
              fontSize: 18,
              marginTop: 10
            }}>{item?.courseTitle}</Text>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              marginTop: 5
            }}>
              <Ionicons name="book-outline" size={20} color="black" />
              <Text style={{
                fontFamily: 'outfit'
              }}>
                {item?.chapters?.length} Chapters</Text>
              </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  courseContainer:{
    padding: 10,
    backgroundColor: Colors.BG_GRAY,
    margin: 6,
    borderRadius: 15,
    width: 260
  }
})