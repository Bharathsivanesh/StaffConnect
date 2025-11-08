import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Chat from "../features/chatbox/Chatbox";
import Home from "../features/home/Home";
import Notify from "../features/notification/Notify";
import Login from "../features/onboarding/login";
import Signup from "../features/onboarding/signup";
import Splash from "../features/splash/Splashscreen";
import course from "../features/Staffcourse/StaffCoursesScreen";
import Syllabus from "../features/syllabusdetails/Syllabusdetails";
const Stack = createNativeStackNavigator();
const Mystack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="course"
        component={course}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="notify"
        component={Notify}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="syllabus"
        component={Syllabus}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default Mystack;
