import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchStaffDetails } from "../../services/staffService";

export default function Home() {
  const navigation = useNavigation();
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStaff = async () => {
      const data = await fetchStaffDetails();
      setStaffData(data);
      setLoading(false);
    };
    loadStaff();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-green-500">
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="flex-row items-center justify-between bg-green-500 px-4 py-4 rounded-b-3xl shadow">
          <TouchableOpacity>
            <Feather name="menu" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold">
            Staff Profiles
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("notify")}>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Loading State */}
        {loading ? (
          <ActivityIndicator size="large" color="#16a34a" className="mt-10" />
        ) : (
          <FlatList
            data={staffData}
            keyExtractor={(item) => item.id}
            className="px-4 mt-4"
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("course", { staffUid: item.uid ,staffname:item.name })
                }
                className="flex-row bg-white p-4 mb-3 rounded-2xl shadow-sm items-center"
              >
                <Image
                  source={require("../../../assets/userpro.jpg")} // ✅ static local image
                  className="w-12 h-12 rounded-full mr-4"
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <Text className="text-gray-900 font-semibold">
                    {item.name}
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    {item.dept?.toUpperCase()}
                  </Text>
                  <Text className="text-gray-400 text-xs">{item.email}</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#9ca3af" />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
