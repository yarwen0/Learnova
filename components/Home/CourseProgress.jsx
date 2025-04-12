import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { imageAssets } from '../../constant/Option'

export default function CourseProgress({courseList}) {
  return (
    <View style={{
      marginTop: 10
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25
      }}>Progress</Text>

      <FlatList
        data={courseList}
        renderItem={({item, index})=>(
          <View>
              <View>
                <Image source={imageAssets[item?.banner_image]}
                  style={{
                    width: 60,
                    height: 60
                  }}
                />
              </View>
          </View>
        )}
      />
    </View>
  )
}