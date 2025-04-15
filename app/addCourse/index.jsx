
import { View, Text, Platform, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import Button from '../../components/Shared/Button'
import Colors from '../../constant/Colors'
import { StyleSheet } from 'react-native'
import { GenerateCourseAIModel, GenerateTopicsAIModel } from '../../config/AiModel'
import Prompt from '../../constant/Prompt'
import {db } from './../../config/firebaseConfig'
import {UserDetailContext} from './../../context/UserDetailContext'
import {useRouter} from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';

export default function AddCourse() {
    const [loading, setLoading] = useState(false);
    const {userDetail, setUserDetail} = useContext(UserDetailContext)
    const [userInput, setUserInput ] = useState();
    const [topics, setTopics] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const router = useRouter();

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

    const onGenerateCourse = async () => {
        setLoading(true);
        const PROMPT = selectedTopics + Prompt.COURSE;
    
        try {
            const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT);
            
            console.log("🔵 Raw AI Response:", aiResp);
    
            if (!aiResp || !aiResp.response || !aiResp.response.text) {
                throw new Error("❌ AI Response is empty or invalid.");
            }
    
            // Ensure response text is valid before parsing
            const rawText = await aiResp.response.text();  // Ensure this is awaited
            console.log("🟢 AI Response Text:", rawText);
    
            if (!rawText.trim()) {
                throw new Error("❌ AI returned an empty response.");
            }
    
            let parsedResponse;
            try {
                parsedResponse = JSON.parse(rawText);
            } catch (parseError) {
                console.error("❌ JSON Parse Error:", parseError);
                console.log("⚠️ Raw AI Response that caused error:", rawText);
                throw new Error("❌ Invalid JSON received from AI.");
            }
    
            // Extract courses array safely
            const coursesArray = parsedResponse.courses || parsedResponse[0]?.courses;
            
            if (!Array.isArray(coursesArray)) {
                throw new Error("❌ 'courses' field is missing or not an array.");
            }
    
            console.log("✅ Parsed AI Response:", coursesArray);
    
            // Save Course info to Database
            for (const course of coursesArray) {
                if (!course.courseTitle) {
                    console.warn("⚠️ Skipping invalid course:", course);
                    continue;
                }
                
                const docId = Date.now().toString()
                await setDoc(doc(db, 'Courses',docId ), {
                    ...course,
                    createdOn: new Date(),
                    createdBy: userDetail?.email || "Unknown User",
                    docId: docId
                });
            }
    
            console.log("✅ Courses saved successfully!");
            router.push('/(tabs)/home');
        } catch (error) {
            console.error("❌ Error generating or saving courses:", error);
        } finally {
            setLoading(false);
        }
    };
    
    
    
    
    

  return (
        <ScrollView style={{
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
        </ScrollView>
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