import { View, Text, Image } from 'react-native'
import React from 'react'
import { imageAssets } from '../../constant/Option'

export default function intro({course}) {
  return (
    <View>
      <Image source={imageAssets[course?.banner_image]}
                  style={{
                      width: '100%'
                  }}
              />
    </View>
  )
}