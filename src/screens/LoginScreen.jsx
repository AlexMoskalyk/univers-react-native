import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthError } from "../redux/reducers/authentication/authSelector";
import Toast from "react-native-toast-message";

import Input from "../components/Input";
import Button from "../components/Button";
import { colors, fonts } from "../../styles/global";
import { loginDB } from "../redux/reducers/authentication/authOperations";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const LoginScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectAuthError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isButtonActive, setButtonActive] = useState(false);

  const signIn = () => {
    if (email && password) {
      dispatch(
        loginDB({
          inputEmail: email,
          inputPassword: password,
        })
      ).then((response) => {
        if (response.type === "auth/login/fulfilled") {
          Toast.show({
            type: "success",
            text1: `${email}`,
            text2: "Ви успішно увійшли!",
          });
          reset();
        } else {
          return Toast.show({
            type: "error",
            text1: "Щось пішло не так.",
            text2: `${errorMessage}`,
          });
        }
      });
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const showPassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const onSignUp = () => {
    navigation.navigate("Register");
  };
  useEffect(() => {
    if (email && password) {
      setButtonActive(true);
      return;
    }
    setButtonActive(false);
  }, [email, password]);

  const showButton = (
    <TouchableOpacity onPress={showPassword}>
      <Text style={[styles.baseText, styles.passwordButtonText]}>Показати</Text>
    </TouchableOpacity>
  );
  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      resizeMode="cover"
      style={styles.backgroundImg}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Увійти</Text>

            <View style={[styles.innerContainer, styles.inputContainer]}>
              <Input
                value={email}
                autofocus={true}
                placeholder="Адреса електронної пошти"
                onTextChange={handleEmailChange}
              />

              <Input
                value={password}
                placeholder="Пароль"
                rightButton={showButton}
                outerStyles={styles.passwordButton}
                onTextChange={handlePasswordChange}
                secureTextEntry={isPasswordVisible}
              />
            </View>

            <View style={[styles.innerContainer, styles.buttonContainer]}>
              <Button
                onPress={signIn}
                buttonSize="large"
                isButtonActive={isButtonActive}
              >
                Увійти
              </Button>

              <View style={styles.signUpContainer}>
                <Text style={[styles.baseText, styles.passwordButtonText]}>
                  Немає акаунту?
                  <TouchableWithoutFeedback onPress={onSignUp}>
                    <Text style={styles.signUpText}> Зареєструватися</Text>
                  </TouchableWithoutFeedback>
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  formContainer: {
    position: "relative",
    width: SCREEN_WIDTH,
    height: "65%",
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
  },

  innerContainer: {
    gap: 16,
  },
  inputContainer: {
    marginTop: 32,
  },

  buttonContainer: {
    marginTop: 42,
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  loginButtonText: {
    color: colors.white,
    textAlign: "center",
  },
  passwordButtonText: {
    color: colors.blue,
  },
  passwordButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    textDecorationLine: "underline",
  },
});
