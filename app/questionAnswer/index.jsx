import { View, Text, SafeAreaView, Image, FlatList, Pressable, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Colors from '../../constant/Colors';

export default function QuestionAnswer() {
    const {courseParams} = useLocalSearchParams();
    const course = JSON.parse(courseParams);
    const qaList = course?.qa
    const [selectedQuestion, setSelectedQuestion] = useState();
  return (
    <SafeAreaView>
    <View>
      <Image
        source={require("./../../assets/images/wave.png")}
            style={{
                height: 800,
                width: "100%",
            }}
        />
        <View style={{
            position: 'absolute',
            width: '100%',
            padding: 20,
            marginTop: 35
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 28,
                color: Colors.WHITE
            }}>Question & Answers</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 20,
                color: Colors.WHITE
            }}>{course?.courseTitle}</Text>

            <FlatList 
                data={qaList}
                renderItem={({ item,index })=>(
                    <Pressable style={styles?.card}
                     onPress={() => setSelectedQuestion(index)}
                    >
                        <Text style={{
                            fontFamily: 'outfit-bold',
                            fontSize: 20
                        }}>{item?.question}</Text>
                        {selectedQuestion == index &&
                            <View>
                                <Text>{item?.answer}</Text>
                            </View>
                        }
                    </Pressable>
                )}
            />

        </View>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    card:{
        backgroundColor: Colors.WHITE,
        marginTop: 15,
        padding: 20,
        borderRadius: 15,
        elevation: 1
    }
})