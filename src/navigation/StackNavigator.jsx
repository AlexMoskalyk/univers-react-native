import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import CommentsScreen from "../screens/CommentsScreen";
import MapScreen from "../screens/MapScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        options={{
          presentation: "modal",
          title: "Коментарі",
          headerTitleAlign: "center",
        }}
        name="Comment"
        component={CommentsScreen}
      />
      <Stack.Screen
        options={{
          presentation: "modal",
          title: "Мапа",
          headerTitleAlign: "center",
        }}
        name="Maps"
        component={MapScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
