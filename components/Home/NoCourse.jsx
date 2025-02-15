import { View, Text, Image } from 'react-native'
import React from 'react'
import Button from '../Shared/Button'

export default function NoCourse() {
  return (
    <View style={{
        marginTop: 40,
        display: 'flex',
        alignItems: 'center'

    }}>
        <Image source={require('./../../assets/images/book.png')} 
        style={{
            height: 200,
            width: 200
        }}/>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 25,
            textAlign: 'center'
        }}>You Don't Have Any Course</Text>

        <Button text = {'+ Create New Course'} />
        <Button text={'Explore Existing Courses'} 
          type='outline'
        />
    </View>
  )
}