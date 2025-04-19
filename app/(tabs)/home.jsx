import { View, Text, Platform, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import Colors from './../../constant/Colors'
import NoCourse from "../../components/Home/NoCourse";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { UserDetailContext } from "../../context/UserDetailContext";
import CourseList from "../../components/Home/CourseList";
import { PraticeOption } from "../../constant/Option";
import PractiseSection from "../../components/Home/PractiseSection";
import CourseProgress from "../../components/Home/CourseProgress";

export default function Home() {

    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        userDetail && GetCourseList();
    }, [userDetail])

    const GetCourseList = async () => {
        setLoading(true);
        setCourseList([]);
        const q = query(collection(db, 'Courses'), where
        ("createdBy", '==', userDetail?.email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log("--", doc.data());
            setCourseList(prev => [...prev, doc.data()])
        })
        setLoading(false);
    }


    return (
        <FlatList
        data={[]}
        onRefresh={() => GetCourseList()}
        refreshing={loading}
        style={{flex: 1, backgroundColor: Colors.WHITE}}
        ListHeaderComponent={
        <View style= {{
            padding: 25,
            flex: 1,
            backgroundColor: Colors.WHITE,
            paddingTop:Platform.OS == 'ios' && 45
        }}>
            <Header />
            {courseList?.length == 0 ?
                <NoCourse /> :
                <View>
                    <CourseProgress courseList={courseList} />
                    <PractiseSection />
                    <CourseList courseList={courseList} />
                </View>
                }
        </View>
        }/>
    )
}