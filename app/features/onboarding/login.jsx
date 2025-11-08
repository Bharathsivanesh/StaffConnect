import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Loader from "../../Components/Loader";
import { loginStudent } from "../../services/Authservice";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
    setLoading(true);
    const result = await loginStudent(email, password);
    if (result.success) {
      Alert.alert("Welcome", `Hi ${result.data.name}!`);
      navigation.navigate("Home", { user: result.data });
    } else {
      Alert.alert("Login Failed", result.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Loader visible={loading} />
      <View className="flex-1 justify-center items-center bg-gray-50 px-6">
        <View className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-md">
          <View className="items-center mb-6">
            <View className="w-16 h-16 bg-green-100 rounded-full justify-center items-center mb-5">
              <Ionicons name="laptop-outline" size={28} color="#22c55e" />
            </View>
            <Text className="text-xl font-semibold text-gray-900">
              Welcome Back
            </Text>
            <Text className="text-gray-500">
              Login to continue to Staff Connect
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-1">Email</Text>
            <View className="flex-row items-center border border-gray-300 rounded-xl px-3">
              <MaterialCommunityIcons
                name="email-outline"
                size={18}
                color="#6b7280"
              />
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                className="flex-1 py-2 px-2 text-gray-700"
                keyboardType="email-address"
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-1">Password</Text>
            <View className="flex-row items-center border border-gray-300 rounded-xl px-3">
              <Feather name="lock" size={18} color="#6b7280" />
              <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className="flex-1 py-2 px-2 text-gray-700"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={18}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="bg-green-500 py-3 rounded-xl mb-4"
            onPress={handleLogin}
          >
            <Text className="text-white text-center text-base font-semibold">
              Log In
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-gray-600">Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text className="text-green-600 font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
