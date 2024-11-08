import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, Text } from "react-native";
import { useFonts } from "expo-font";

import StackNavigator from "./src/navigation/StackNavigator";
import { PersistGate } from "redux-persist/integration/react";
import { Provider, useDispatch } from "react-redux";
import store from "./src/redux/store/store";
import { authStateChanged } from "./src/utils/auth";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Provider store={store.store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={store.persistor}
      >
        <AuthListener />
      </PersistGate>
    </Provider>
  );
}

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = authStateChanged(dispatch);
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <StackNavigator />
      <Toast />
    </NavigationContainer>
  );
};
