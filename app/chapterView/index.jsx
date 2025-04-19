import { View, Text, Dimensions, Platform, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import * as Progress from 'react-native-progress';
import Colors from '../../constant/Colors';
import Button from '../../components/Shared/Button';


export default function ChapterView() {
    const {chapterParams, docId, chapterIndex} = useLocalSearchParams();
    const chapters=JSON.parse(chapterParams)
    const [currentPage, setCurrentPage]=useState(0);

    const GetProgress=(currentPage)=> {
        const perc=(currentPage/chapters?.content?.length);
        return perc;
    }

    const onChapterComplete() ={

    }
  return (
    <View style={{
        padding: 25,
        paddingTop:Platform.OS == 'ios' && 60,
        backgroundColor: Colors.WHITE,
        flex: 1
        

    }}>
        <Progress.Bar progress={GetProgress(currentPage)} width={Dimensions.get('screen').width * 0.85} />

        <View style={{
            marginTop: 20
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25
            }}>{chapters?.content[currentPage]?.topic}</Text>

            <Text style={{
                fontFamily: 'outfit',
                fontSize: 20,
                marginTop: 7
            }}>{chapters?.content[currentPage]?.explain}</Text>

            {chapters?.content[currentPage]?.code && <Text style={[styles.codeExampleText, {backgroundColor: Colors.BLACK}]}>{chapters?.content[currentPage]?.code}</Text>}
            {/* <Text>Example:</Text> */}
            {chapters?.content[currentPage]?.example && <Text style={styles.codeExampleText}>{chapters?.content[currentPage]?.example}</Text>}

        </View>

        <View style={{
            position: 'absolute',
            bottom: 10,
            width: '100%',
            left: 25
        }}>
            {chapters?.content?.length-1 != currentPage?
            <Button text={'Next'} onPress={() => setCurrentPage(currentPage+1)} />
            : <Button text={'Finish'} onPress={() => onChapterComplete()}/>}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    codeExampleText: {
        padding: 15,
        backgroundColor: Colors.BG_GRAY,
        borderRadius: 15,
        fontFamily: 'outfit',
        fontSize: 18,
        marginTop: 15
    }
})