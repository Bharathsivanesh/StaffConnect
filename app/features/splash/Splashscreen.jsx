// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import React, { useEffect } from "react";
// import { Text, View } from "react-native";

// export default function SplashScreen() {
//   const navigation = useNavigation();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.replace("login");
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [navigation]);

//   return (
//     <View className="flex-1 justify-center items-center bg-gradient-to-br from-green-400 to-green-600">

//       <View className="w-16 h-16 rounded-full bg-white/20 justify-center items-center mb-4">
//         <Ionicons name="laptop-outline" size={40} color="white" />
//       </View>

//       {/* App Name */}
//       <Text className="text-white text-2xl font-bold">Staff Connect</Text>
//     </View>
//   );
// }
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("course");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={["#34D399", "#047857"]} style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="laptop-outline" size={40} color="white" />
      </View>

      <Text style={styles.appName}>Staff Connect</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  appName: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
