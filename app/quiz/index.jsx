import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function Quiz() {
    const { courseParams } = useLocalSearchParams();
  return (
    <SafeAreaView>
    <View>
      <Text>Quiz</Text>
    </View>
    </SafeAreaView>
  )
}