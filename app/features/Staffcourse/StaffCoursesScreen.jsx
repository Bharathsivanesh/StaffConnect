import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchCoursesByStaff } from "../../services/staffService";

export default function StaffCoursesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { staffUid, staffname } = route.params;

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      const data = await fetchCoursesByStaff(staffUid);
      setCourses(data);
      setLoading(false);
    };
    loadCourses();
  }, [staffUid]);

  const renderCourse = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("syllabus", { courses: courses, C_ID: item.C_ID })
      }
      className="bg-white p-4 mb-3 mx-4 rounded-2xl shadow-sm"
    >
      <Text className="text-gray-500 text-xs">Added on {item.createdAt}</Text>
      <Text className="text-green-600 font-semibold text-base mt-1">
        {item.c_name}
      </Text>
      <Feather
        name="chevron-right"
        size={20}
        color="#9ca3af"
        style={{ position: "absolute", right: 16, top: "45%" }}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-green-500">
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="flex-row items-center justify-center bg-green-500 px-4 py-4 rounded-b-3xl shadow">
          <Text className="text-white text-lg font-semibold">
            Staff Courses
          </Text>
        </View>

        {/* Loading */}
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#16a34a" />
          </View>
        ) : courses.length > 0 ? (
          <FlatList
            data={courses}
            keyExtractor={(item) => item.id}
            renderItem={renderCourse}
            className="mt-4"
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Ionicons
              name="school-outline"
              size={48}
              color="#9ca3af"
              style={{ marginBottom: 8 }}
            />
            <Text className="text-gray-700 font-semibold text-base">
              No Courses Found
            </Text>
            <Text className="text-gray-500 text-sm mt-1 text-center">
              This staff hasn’t added any courses yet.
            </Text>
          </View>
        )}
      </View>
      {/* Floating Chat Button */}
      <TouchableOpacity
        className="absolute bottom-16 right-6 bg-green-500 w-14 h-14 rounded-full justify-center items-center shadow-lg"
        onPress={() =>
          navigation.navigate("chat", {
            staffUid: staffUid,
            staffname: staffname,
          })
        }
      >
        <Feather name="message-circle" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
