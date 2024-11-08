import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons } from "@expo/vector-icons";

import PostsScreen from "../screens/PostsScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { colors } from "../../styles/global";
import LogoutButton from "../components/LogoutButton";
import { useDispatch } from "react-redux";
import { logoutDB } from "../redux/reducers/authentication/authOperations";

const Tabs = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutDB());
  };
  return (
    <Tabs.Navigator
      screenOptions={({ navigation }) => ({
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        tabBarLabel: "",
        headerRight: () => <LogoutButton onPress={handleLogout} />,
      })}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={({ navigation }) => ({
          title: "Публікації",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="grid-outline"
              size={24}
              color={focused ? `${colors.orange}` : `${colors.black_primary}`}
            />
          ),
        })}
      />
      <Tabs.Screen
        name="Create Post"
        component={CreatePostScreen}
        options={({ navigation }) => ({
          title: "Створити публікацію",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="add-circle-sharp"
              size={32}
              color={focused ? `${colors.orange}` : `${colors.black_primary}`}
            />
          ),
        })}
      />

      <Tabs.Screen
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              size={24}
              color={focused ? `${colors.orange}` : `${colors.black_primary}`}
            />
          ),
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
};

export default BottomTabNavigator;
