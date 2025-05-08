import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./../../config/firebaseConfig";


export default function CourseListByCategory({ category }) {

    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        GetCourseListByCategory();
    }, [category])

  const GetCourseListByCategory = async () => {
    setCourseList([]);
    setLoading(true)
    const q = query(
      collection(db, "Courses"),
      where("category", "==", category),
      orderBy("createdOn", "desc")
    );

    const querySnapshot = await getDocs(q);

    querySnapshot?.forEach((doc) => {
      console.log("--", doc.data());
      setCourseList(prev => [...prev,doc.data()])
    });
    setLoading(false)
  };

  return (
    <View>
      <Text>CourseListByCategory</Text>
    </View>
  );
}
