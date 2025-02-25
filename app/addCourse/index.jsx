import { View, Text, Platform, TextInput, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import Button from '../../components/Shared/Button'
import Colors from '../../constant/Colors'
import { StyleSheet } from 'react-native'
import { GenerateCourseAIModel, GenerateTopicsAIModel } from '../../config/AiModel'
import Prompt from '../../constant/Prompt'
import {db} from './../../config/firebaseConfig'
import {UserDetailContext} from './../../context/UserDetailContext'

export default function AddCourse() {
    const [loading, setLoading] = useState(false);
    const {userDetail, setUserDetail} = useContext(UserDetailContext)
    const [userInput, setUserInput ] = useState();
    const [topics, setTopics] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);

    const onGenerateTopic = async() => {
        setLoading(true);
        // Get Topic Ideas from AI Model
        const PROMPT = userInput + Prompt.IDEA;
        const aiResp = await GenerateTopicsAIModel.sendMessage(PROMPT)
        const topicIdea = JSON.parse(aiResp.response.text());
        console.log(topicIdea);
        setTopics(topicIdea);
        setLoading(false);
    }

    const onTopicSelect=(topic) => {
        const isAlreadyExist = selectedTopics.find((item)=>item==topic)
        if (!isAlreadyExist) {
            setSelectedTopics(prev => [...prev,topic])
        }
        else {
            const topics = selectedTopics.filter(item=>item!==topic);
            setSelectedTopics(topics);
        }
    }

    const isTopicSelected = (topic) => {
        const selection = selectedTopics.find(item=>item==topic);
        return selection?true:false
    }

    /**
     * Used to Generate Course using AI Model
     */

    const onGenerateCourse = async() => {
        setLoading(true);
        const PROMPT = selectedTopics + Prompt.COURSE;

        const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT);
        const courses = JSON.parse(aiResp.response.text());
        console.log(courses);
        // Save Course info to Database
        courses?.forEach(async(course) => {
            await selectedTopics(doc(db, 'Courses', Date.now().toString()),{
                ...course,
                createdOn: new Date(),
                createdBy: userDetail?.email
            })
        })

        setLoading(false);

    }

  return (
        <View style={{
            padding: 25,
            backgroundColor: Colors.WHITE,
            paddingTop:Platform.OS == 'ios' && 45,
            flex: 1   
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 30
            }}>Create New Course</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 30
            }}>What You want to learn today?</Text>
            <Text style={{
                fontSize: 20,
                marginTop: 8,
                color: Colors.GRAY
            }}>What course you want to create (ex. Learn Python, Digital Marketing, Science Chapter, etc...)</Text>

            <TextInput placeholder='(Ex. Learn Programming, Learn History)' 
            style={styles.textInput}
            numberOfLines={3}
            multiline={true}
            onChangeText={(value) => setUserInput(value)}
            />

            <Button  text={'Generate Topic'} type='outline' onPress={() => onGenerateTopic()} loading={loading} />
            
            <View style={{
                marginTop: 15,
                marginBottom: 10
            }}>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 20
                }}>Select all topics which you want to add in the course</Text>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 10,
                    marginTop: 6
                }}>
                    {topics.map((item, index)=>(
                        <Pressable key={index} onPress={() => onTopicSelect(item)} >
                            <Text style={{
                                padding: 7,
                                borderWidth: 0.4,
                                borderRadius: 99,
                                paddingHorizontal: 15,
                                backgroundColor: isTopicSelected(item)?Colors.PRIMARY:null,
                                color: isTopicSelected(item)?Colors.WHITE:Colors.PRIMARY
                            }}>{item}</Text>
                        </Pressable>
                    ))}
                </View>
            </View> 

            {selectedTopics?.length>0&& <Button text='Generate Course'
                onPress={() => onGenerateCourse()}
                loading={loading}
            />}
        </View>
    )
}


const styles = StyleSheet.create({
    textInput: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        height: 100,
        marginTop: 10,
        alignItems: 'flex-start',
        fontSize: 18
    }
})



