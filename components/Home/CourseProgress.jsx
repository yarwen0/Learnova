import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { imageAssets } from '../../constant/Option'
import Colors from '../../constant/Colors'

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
        horizontal={true}
        renderItem={({ item, index })=>(
          <View style={{
            margin: 7,
            padding: 15,
            backgroundColor: Colors.BG_GRAY,
            borderRadius: 15,
            width: 280
          }}>
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 8

              }}>
                <Image source={imageAssets[item?.banner_image]}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 8
                  }}
                />
                <View style={{
                  flex: 1
                }}>
                    <Text 
                    numberOfLines={2}
                    style={{
                      fontFamily: 'outfit-bold',
                      fontSize: 19,
                      flexWrap: 'wrap'
                    }}>{item?.courseTitle}</Text>
                    <Text style={{
                      fontFamily: 'outfit',
                      fontSize: 15
                    }}>{item?.chapters?.length} Chapter</Text>
                </View>
              </View>
          </View>
        )}
      />
    </View>
  )
}