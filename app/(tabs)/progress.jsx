import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../../context/UserDetailContext";
import CourseProgressCard from "../../components/Shared/CourseProgressCard";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default function Progress() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail]);

  const GetCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail?.email),
      orderBy("createdOn", "desc")
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log("--", doc.data());
      setCourseList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <View>
        <Image
          source={require("./../../assets/images/wave.png")}
          style={{
            position: "absolute",
            width: "100%",
            height: 700,
          }}
        />
        <View
          style={{
            width: "100%",
            position: "absolute",
            padding: 20,
          }}
        >
          <FlatList
            data={courseList}
            renderItem={({ item, index }) => (
              <TouchableOpacity>
                <CourseProgressCard item={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
