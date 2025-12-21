import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QAandPapersScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { courses, C_ID } = route.params || {}; // ✅ Safe destructure

  const [activeTab, setActiveTab] = useState("papers");
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    if (courses && C_ID) {
      const course = courses.find((item) => item.C_ID === C_ID);
      if (course) setSelectedCourse(course);
    }
    setLoading(false);
  }, [courses, C_ID]);

  const handleDownload = (url) => {
    if (url) {
      Linking.openURL(url);
    } else {
      alert("No file URL found!");
    }
  };


  const {
    c_name = "Unknown Course",
    file_name = "Untitled File",
    file_url = null,
    uploadedAt = null,
    qa_pairs = [],
  } = selectedCourse || {};

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#22c55e" />
        <Text className="text-gray-500 mt-2">Loading course details...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-green-500">
      <View className="flex-1 bg-gray-100">
        {/* Toggle Tabs */}
        <View className="flex-row bg-white p-3 rounded-b-2xl shadow justify-around">
          <TouchableOpacity
            onPress={() => setActiveTab("papers")}
            className={`px-4 py-2 rounded-full ${
              activeTab === "papers" ? "bg-green-500" : "bg-gray-100"
            }`}
          >
            <Text
              className={`font-medium ${
                activeTab === "papers" ? "text-white" : "text-gray-600"
              }`}
            >
              Questions & Papers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("questions")}
            className={`px-4 py-2 w-32 text-center rounded-full ${
              activeTab === "questions" ? "bg-green-500" : "bg-gray-100"
            }`}
          >
            <Text
              className={`font-medium text-center ${
                activeTab === "questions" ? "text-white" : "text-gray-600"
              }`}
            >
              Q&A
            </Text>
          </TouchableOpacity>
        </View>

        {/* Render Section */}
        <View className="flex-1 px-4 mt-4">
          {activeTab === "papers" ? (
            <>
              <Text className="text-gray-900 font-semibold mb-3">
                {c_name} — Uploaded Question Papers
              </Text>

              {file_url ? (
                <View className="flex-row items-center bg-white p-4 mb-3 rounded-2xl shadow-sm">
                  <Feather name="file-text" size={22} color="#22c55e" />
                  <View className="ml-3 flex-1">
                    <Text className="text-gray-900 font-semibold">
                      {file_name}
                    </Text>
                    <Text className="text-gray-400 text-xs">
                      Uploaded on{" "}
                      {uploadedAt
                        ? new Date(uploadedAt).toLocaleDateString()
                        : "Unknown Date"}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => file_url && handleDownload(file_url)}
                    disabled={!file_url}
                  >
                    <Feather
                      name="download"
                      size={20}
                      color={file_url ? "#16a34a" : "#9ca3af"}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <Text className="text-gray-500 text-center mt-10">
                  No file uploaded for this course.
                </Text>
              )}
            </>
          ) : qa_pairs.length > 0 ? (
            <FlatList
              data={qa_pairs}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View className="bg-white p-4 mb-3 rounded-2xl shadow-sm">
                  <View className="flex-row items-center mb-2">
                    <View className="bg-green-100 w-7 h-7 rounded-full items-center justify-center mr-2">
                      <Text className="text-green-600 font-semibold text-xs">
                        Q{index + 1}
                      </Text>
                    </View>
                    <Text className="flex-1 text-gray-800">
                      {item?.question || "No question found"}
                    </Text>
                  </View>

                  <View className="mt-2">
                    <Text className="text-gray-700 text-sm">
                      {item?.answer || "No answer available"}
                    </Text>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text className="text-gray-500 text-center mt-10">
              No Q&A data available for this course.
            </Text>
          )}
        </View>

     
      </View>
    </SafeAreaView>
  );
}
