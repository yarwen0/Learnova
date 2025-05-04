import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Colors from '../../constant/Colors';

export default function QuizSummary() {
    const { quizResultParam } = useLocalSearchParams();
    const quizResult = JSON.parse(quizResultParam)
    const [correctAns, setCorrectAns] = useState(0);
    const [totalQuestion, setTotalQuestion] = useState(0);

    useEffect(() => {
        CalculateResult();
    }, [])

    const CalculateResult = () => {
        if (quizResult !== undefined) {
            const correctAns_ = Object.entries(quizResult)
                ?.filter(([key, value]) => 
                    value?.isCorrect == true)
                console.log(correctAns);
                const totalQues_ = Object.keys(quizResult).length;

                setCorrectAns(correctAns_.length);
                setTotalQuestion(totalQues_);
        }
    }

    const GetPercMark=() => {
        return ((correctAns/totalQuestion)*100).toFixed(0);
    }

  return (
    <SafeAreaView>
        <View>
            <Image source={require('./../../assets/images/wave.png')} 
            style={{
                width: '100%',
                height: 700
            }}
            />
            <View style={{
                position: 'absolute',
                width: '100%',
                padding: 35
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: 'outfit-bold',
                    fontSize: 30,
                    color: Colors.WHITE
                }}>Quiz Summary</Text>
                <View style={{
                    backgroundColor: Colors.WHITE,
                    padding: 20,
                    borderRadius: 20,
                    marginTop: 60,
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Image source={require('./../../assets/images/trophy.png')} 
                    style={{
                        width: 100,
                        height: 100,
                        marginTop: -60
                    }}
                    />
                    <Text style={{
                        fontSize: 26,
                        fontFamily: 'outfit-bold',

                    }}>{GetPercMark()>60?'Congratulations':'Try Again!'}
                        </Text>
                        <Text style={{
                            fontFamily: 'outfit',
                            color: Colors.GRAY,
                            fontSize: 17
                        }}>You gave {GetPercMark()}% Correct Answer</Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10
                        }}>
                            <View style={styles.resultTextContainer}>
                                <Text style={styles.resultText}>Q {totalQuestion}</Text>
                            </View>
                            <View style={styles.resultTextContainer}>
                                <Text style={styles.resultText}>
                                    ✅ {totalQuestion} </Text>
                            </View>
                            <View style={styles.resultTextContainer}>
                                <Text style={styles.resultText}>
                                    ❌ {correctAns} </Text>
                            </View>
                        </View>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    resultTextContainer:{
        padding: 15,
        backgroundColor: Colors.WHITE,
        elevation: 1
    },
    resultText:{
        fontFamily: 'outfit',
        fontSize: 20

    }
})