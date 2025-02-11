import { Image, Text, TouchableOpacity, View } from "react-native";
import Colors from '../constant/Colors';
import { StyleSheet } from 'react-native';
import { useRouter } from "expo-router";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useContext, useEffect } from "react";

export default function Index() {
  const router = useRouter();
  const { setUserDetail } = useContext(UserDetailContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        console.log(user);
        const result = await getDoc(doc(db, 'users', user.email)); // Ensure user.email is valid
        if (result.exists()) {
          setUserDetail(result.data());
        }
        router.replace('/(tabs)/home')
      }
    });

    return () => unsubscribe(); // Clean up on component unmount
  }, [setUserDetail, router]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <Image
        source={require('./../assets/images/landing.png')}
        style={{
          width: '100%',
          height: 300,
          marginTop: 70,
        }}
      />
      <View
        style={{
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: '100%',
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            color: Colors.WHITE,
            fontFamily: 'outfit-bold',
            fontWeight: 'bold',
          }}
        >
          Welcome to Learnova
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: Colors.WHITE,
            marginTop: 20,
            textAlign: 'center',
            fontFamily: 'outfit',
          }}
        >
          Transform the way you learn by generating personalized learning paths
          tailored to your needs.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/auth/signUp')}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>
            Get Started
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/auth/signIn')}
          style={[
            styles.button,
            { backgroundColor: Colors.PRIMARY, borderWidth: 1, borderColor: Colors.WHITE },
          ]}
        >
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>
            Already have an account?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'outfit',
  },
});
