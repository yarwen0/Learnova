import { View, Text, Platform, TextInput } from 'react-native'
import React, { useState } from 'react'
import Button from '../../components/Shared/Button'
import Colors from '../../constant/Colors'
import { StyleSheet } from 'react-native'
import { GenerateTopicsAIModel } from '../../config/AiModel'
import Prompt from '../../constant/Prompt'

export default function AddCourse() {
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput ] = useState();
    const onGenerateTopic = async() => {
        setLoading(true);
        // Get Topic Ideas from AI Model
        const PROMPT = userInput + Prompt.IDEA;
        const aiResp = await GenerateTopicsAIModel.sendMessage(PROMPT)
        const topicIdea = aiResp.response.text();
        console.log(topicIdea);
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