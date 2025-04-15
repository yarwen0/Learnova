import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function Chapters({course}) {
  return (
    <View style={{
        padding: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25
      }}>Chapters</Text>

      <FlatList 
        data={course?.chapters}
        renderItem={({item, index}) => (
            <View style={{
                padding: 18,
                borderWidth: 0.5,
                borderRadius: 15,
                marginTop: 10
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10
                }}>
                    <Text style={styles.chapterText}>{index + 1}.</Text>
                    <Text style={styles.chapterText}>{item?.chapterName}</Text>
                </View>
            </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    chapterText:{
        fontFamily: 'outfit',
        fontSize: 20
    }
})