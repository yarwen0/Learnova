import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  StyleSheet
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constant/Colors";
import FlipCard from "react-native-flip-card";

export default function Flashcards() {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const flashcard = course?.flashcards;
  const [currentPage, setCurrentPage] = useState(0);
  const width = Dimensions.get("screen").width;

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
        <View
          style={{
            position: "absolute",
            padding: 25,
            width: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Pressable onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={30} color="white" />
            </Pressable>
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 25,
                color: Colors.WHITE,
              }}
            >
              {currentPage + 1} of {flashcard?.length}
            </Text>
          </View>

          <FlatList
            data={flashcard}
            horizontal={true}
            pagingEnabled
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={{
                  height: 500,
                  width: width * 0.9,
                }}
              >
                <FlipCard style={styles.flipCard}>
                  {/* Face Side */}
                  <View style={styles.frontCard}>
                    <Text>The Face</Text>
                  </View>
                  {/* Back Side */}
                  <View style={styles.backCard}>
                    <Text>The Back</Text>
                  </View>
                </FlipCard>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flipCard:{

  },
  frontCard:{

  },
  backCard:{

  }
})