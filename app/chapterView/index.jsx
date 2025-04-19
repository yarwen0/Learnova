import { View, Text, Dimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import * as Progress from 'react-native-progress';


export default function ChapterView() {
    const {chapterParams, docId, chapterIndex} = useLocalSearchParams();
    const chapters=JSON.parse(chapterParams)
    const [currentPage, setCurrentPage]=useState(0);

    const GetProgress=(currentPage)=> {
        const perc=(currentPage/chapters?.content?.length);
        return perc;
    }
  return (
    <View style={{
        padding: 25,
        paddingTop:Platform.OS == 'ios' && 60,
        

    }}>
        <Progress.Bar progress={GetProgress(currentPage)} width={Dimensions.get('screen').width * 0.85} />

        <View>
            <Text>{chapters?.content[currentPage]?.topic}</Text>
        </View>
    </View>
  )
}