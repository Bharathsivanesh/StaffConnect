import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const messagesData = [
  {
    id: "1",
    sender: "teacher",
    text: "Hello! How can I help you with your homework today?",
    time: "10:00 AM",
  },
  {
    id: "2",
    sender: "student",
    text: "Hi! I’m having trouble with the algebra problem from chapter 3. Could you explain the concept of factoring?",
    time: "10:01 AM",
  },
  {
    id: "3",
    sender: "teacher",
    text: "Of course. Factoring is like breaking down a number into its smaller pieces. For polynomials, it means finding expressions that you can multiply together to get the original expression.",
    time: "10:02 AM",
  },
  {
    id: "4",
    sender: "student",
    text: "Okay, that makes sense. Can we go through an example?",
    time: "10:03 AM",
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(messagesData);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      sender: "student",
      text: input,
      time: "Now",
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <SafeAreaView className="flex-1 bg-green-500">
      <View className="flex-1 bg-gray-100">
        {/* Header */}
        <View className="flex-row items-center bg-green-500 p-4 shadow-sm">
          <TouchableOpacity className="mr-4">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Image
            source={require("../../../assets/userpro.jpg")}
            className="w-10 h-10 rounded-full mr-3 "
          />
          <View>
            <Text className="text-white font-semibold">Ms. Davison</Text>
            <Text className="text-white text-xs">Online</Text>
          </View>
        </View>

        {/* Chat messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View
              className={`mb-3 ${
                item.sender === "student" ? "items-end" : "items-start"
              }`}
            >
              <View
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  item.sender === "student"
                    ? "bg-green-500 rounded-br-none"
                    : "bg-white rounded-bl-none"
                }`}
              >
                <Text
                  className={`${
                    item.sender === "student" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.text}
                </Text>
              </View>
              <Text className="text-gray-400 text-[10px] mt-1">
                {item.time}
              </Text>
            </View>
          )}
        />

        {/* Input bar */}
        <View className="flex-row items-center bg-white px-3 py-2 border-t border-gray-200">
       
          <TextInput
            className="flex-1 bg-gray-100 rounded-full px-4 py-4 text-gray-800"
            placeholder="Type your message..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            className="ml-2 bg-green-500 w-10 h-10 rounded-full items-center justify-center"
            onPress={handleSend}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
