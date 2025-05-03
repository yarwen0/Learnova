import { View, Text, SafeAreaView, Image, Pressable, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constant/Colors';
import * as Progress from 'react-native-progress';
import Button from './../../components/Shared/Button'


export default function Quiz() {
    const { courseParams } = useLocalSearchParams();
    const course=JSON.parse(courseParams);
    const [currentPage, setCurrentPage] = useState(0);
    const quiz = course?.quiz;
    const [selectedOption, setSelectedOption] = useState();
  return (
    <SafeAreaView> 
        <View>
            <Image source={require('./../../assets/images/wave.png')} 
                style={{
                    height: 800,
                    width: "100%"
                }}
            />
            <View style={{
                    position: 'absolute',
                    padding: 25,
                    width: '100%'
                }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'

                }}>
                    <Pressable>
                        <Ionicons name="arrow-back" size={30} color="white" />
                    </Pressable>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 25,
                        color: Colors.WHITE
                    }}>0 of 5</Text>
                </View>
                <View style={{
                    marginTop: 20
                }}>
                    <Progress.Bar progress={0.3} width={Dimensions.get('window').width * 0.85} 
                    color={Colors.WHITE} height={10} />
                </View>
                <View style={{
                    padding: 25,
                    backgroundColor: Colors.WHITE,
                    marginTop: 30,
                    height: Dimensions.get('screen').height * 0.65,
                    elevation: 1,
                    borderRadius: 20
                }}>
                    <Text style={{
                        fontSize: 25,
                        fontFamily: 'outfit-bold',
                        textAlign: 'center'
                    }}>{quiz[currentPage]?.question}</Text>

                    {quiz[currentPage]?.options.map((item,index)=>(
                        <View key={index} style={{
                            padding: 20,
                            borderWidth: 0.3,
                            borderRadius: 15,
                            marginTop: 8
                        }}>
                            <Text style={{
                                fontFamily: 'outfit',
                                fontSize: 20
                            }}>{item}</Text>
                        </View>
                    ))}
                </View>
                <Button text={'Next'} />
            </View>
        </View>
    </SafeAreaView>
  )
}