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
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import Input from "../components/Input";
import Button from "../components/Button";
import { colors, fonts } from "../../styles/global";
import { useEffect, useState } from "react";
import ImageBG from "../../assets/images/PhotoBG.jpg";
import AddAvatar from "../../assets/images/add.png";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const RegistrationScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isButtonActive, setButtonActive] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleNameChange = (value) => {
    setName(value);
  };

  const showPassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleChoosePhoto = () => {};

  const onLogin = () => {
    navigation.navigate("Login");
  };

  const onSignUp = () => {
    navigation.navigate("Home");
  };

  const addAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Ви відмовилися від доступ до ваших фотографій!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const isNameValid = name.length >= 2;
    const isEmailValid = email.includes("@") && email.includes(".");
    const isPasswordValid = password.length >= 6;

    if (isNameValid && isEmailValid && isPasswordValid) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [name, email, password]);

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
            <View style={styles.avatarBox}>
              <Image style={styles.avatarImg} source={{ uri: profilePhoto }} />

              <TouchableOpacity onPress={addAvatar} style={styles.avatarAdd}>
                <Image style={styles.tinyLogo} source={AddAvatar} />
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity
              onPress={handleChoosePhoto}
              style={styles.avatarContainer}
            >
              <ImageBackground style={styles.avatar}>
                <View style={styles.iconAdd}>
                  <Text style={styles.innerIcon}>+</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity> */}
            <Text style={styles.title}>Реєстрація</Text>
            <View style={[styles.innerContainer]}>
              <Input
                value={name}
                autofocus={true}
                placeholder="Логін"
                onTextChange={handleNameChange}
              />
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
                buttonSize="large"
                isButtonActive={isButtonActive}
                onPress={onSignUp}
              >
                Зареєструватися
              </Button>
              <View style={styles.signUpContainer}>
                <Text style={[styles.baseText, styles.passwordButtonText]}>
                  Вже є акаунту?
                  <TouchableWithoutFeedback onPress={onLogin}>
                    <Text style={styles.signUpText}> Увійти</Text>
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

export default RegistrationScreen;

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
    paddingBottom: 32,
    justifyContent: "space-between",
    alignItems: "center",
  },

  avatarBox: {
    width: 120,
    height: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,
    position: "relative",
    top: -60,
  },

  avatarImg: {
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "relative",
  },
  avatarAdd: {
    position: "absolute",
    left: 107,
    top: 80,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
  },

  innerContainer: {
    gap: 16,
    width: "100%",
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
  // avatarContainer: {
  //   position: "absolute",
  //   width: 120,
  //   height: 120,
  //   top: -90,
  //   zIndex: 100,
  // },

  // avatar: {
  //   position: "relative",
  //   flex: 1,
  //   backgroundColor: colors.light_gray,
  //   borderRadius: 16,
  // },

  // iconAdd: {
  //   position: "absolute",
  //   bottom: 0,
  //   right: 0,
  //   width: 32,
  //   height: 32,
  //   borderWidth: 1,
  //   borderRadius: 50,
  //   borderColor: colors.orange,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },

  // innerIcon: {
  //   color: colors.orange,
  // },
});