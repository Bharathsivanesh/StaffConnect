import { Feather, Ionicons } from "@expo/vector-icons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const notifications = [
  {
    id: "1",
    title: "New message from Sarah Connor",
    time: "5m ago",
    icon: <Feather name="message-square" size={20} color="#22c55e" />,
    section: "Today",
  },
  {
    id: "2",
    title: "Reminder: 'UX Principles' is due tomorrow.",
    time: "1h ago",
    icon: <Feather name="calendar" size={20} color="#22c55e" />,
    section: "Today",
  },
  {
    id: "3",
    title: "Your grade for 'Quiz I' has been posted.",
    time: "Yesterday",
    icon: <Feather name="check-circle" size={20} color="#9ca3af" />,
    section: "Yesterday",
  },
  {
    id: "4",
    title: "New course material added to 'Design Fundamentals'.",
    time: "2 days ago",
    icon: <Feather name="file-text" size={20} color="#9ca3af" />,
    section: "This Week",
  },
];

export default function NotificationsScreen() {
  const groupedData = notifications.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  const sections = Object.keys(groupedData);

  return (
    <SafeAreaView className="flex-1 bg-green-500">
      {/* Header */}
      <View className="flex-1 bg-gray-100">
        <View className="flex-row items-center justify-center bg-green-500 px-4 py-4 rounded-b-3xl shadow">
          <Text className="text-white text-lg font-semibold">NotiFication</Text>
        </View>

        <FlatList
          data={sections}
          keyExtractor={(section) => section}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item: section }) => (
            <View className="mb-6">
              <Text className="text-gray-500 text-sm mb-2">{section}</Text>
              {groupedData[section].map((notif) => (
                <TouchableOpacity
                  key={notif.id}
                  className={`flex-row items-center p-4 mb-2 rounded-2xl ${
                    section === "Today" ? "bg-green-100" : "bg-white"
                  }`}
                >
                  <View className="mr-3">{notif.icon}</View>
                  <View className="flex-1">
                    <Text className="text-gray-900 font-medium">
                      {notif.title}
                    </Text>
                    <Text className="text-gray-400 text-xs">{notif.time}</Text>
                  </View>
                  <Ionicons name="ellipse" size={8} color="#22c55e" />
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
