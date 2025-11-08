import Loader from "@/app/Components/Loader";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerStudent } from "../../services/Authservice";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    setLoading(true);
    const result = await registerStudent(name, email, password);
    if (result.success) {
      Alert.alert("Success", result.message);
      navigation.navigate("login");
    } else {
      Alert.alert("Error", result.message);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Loader visible={loading} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center px-6 py-8">
          <View className="w-16 h-16 bg-green-100 rounded-full justify-center items-center mb-5">
            <Ionicons name="laptop-outline" size={28} color="#22c55e" />
          </View>
          <Text className="text-2xl font-semibold text-gray-900">
            Create an Account
          </Text>

          <View className="w-full mt-4 bg-white rounded-2xl px-4 py-3 mb-3 flex-row items-center shadow-sm">
            <Feather name="user" size={18} color="#9ca3af" />
            <TextInput
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              className="flex-1 ml-2 text-gray-800"
            />
          </View>

          <View className="w-full bg-white rounded-2xl px-4 py-3 mb-3 flex-row items-center shadow-sm">
            <Feather name="mail" size={18} color="#9ca3af" />
            <TextInput
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              className="flex-1 ml-2 text-gray-800"
            />
          </View>

          <View className="w-full bg-white rounded-2xl px-4 py-3 mb-3 flex-row items-center shadow-sm">
            <Feather name="lock" size={18} color="#9ca3af" />
            <TextInput
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              className="flex-1 ml-2 text-gray-800"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={18}
                color="#9ca3af"
              />
            </TouchableOpacity>
          </View>

          <View className="w-full bg-white rounded-2xl px-4 py-3 mb-5 flex-row items-center shadow-sm">
            <Feather name="lock" size={18} color="#9ca3af" />
            <TextInput
              placeholder="Confirm your password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              className="flex-1 ml-2 text-gray-800"
            />
          </View>

          <TouchableOpacity
            onPress={handleSignUp}
            className="bg-green-500 w-full py-3 rounded-2xl items-center shadow"
          >
            <Text className="text-white font-semibold text-base">Sign Up</Text>
          </TouchableOpacity>

          <View className="flex-row mt-4">
            <Text className="text-gray-500">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text className="text-green-600 font-semibold">Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
