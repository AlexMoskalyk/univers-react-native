import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

import { getPosts, toggleLike } from "../redux/reducers/posts/postOperations";
import {
  logoutDB,
  updateAvatarDB,
} from "../redux/reducers/authentication/authOperations";
import { selectUsersPosts } from "../redux/reducers/posts/postSelector";
import Post from "../components/Post";
import LogoutButton from "../components/LogoutButton";
import AddAvatarImg from "../../assets/images/add.png";
import { colors, fonts } from "../../styles/global";
import ImageBG from "../../assets/images/PhotoBG.jpg";
import { selectUser } from "../redux/reducers/authentication/authSelector";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userId = user.uid;
  const selectPostsByUserId = selectUsersPosts(userId);
  const posts = useSelector((state) => selectPostsByUserId(state));
  const [newAvatarUri, setNewAvatarUri] = useState("");

  const changeAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      return Toast.show({
        type: "info",
        text1: "Access to photos is required to update your avatar.",
      });
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setNewAvatarUri(result.assets[0].uri);
      dispatch(updateAvatarDB(result.assets[0].uri));
    }
  };

  const handleLogout = () => {
    dispatch(logoutDB());
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [user.photo]);

  const handleLikeToggle = (postId) => {
    dispatch(toggleLike({ postId, userId }));
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={ImageBG} style={styles.imageBg}>
        <View style={styles.contentBox}>
          <View style={styles.avatarBox}>
            <Image
              style={styles.avatarImg}
              source={{ uri: newAvatarUri ? newAvatarUri : user.photo }}
            />
            <TouchableOpacity
              onPress={() => changeAvatar()}
              style={styles.avatarAdd}
            >
              <Image style={styles.tinyLogo} source={AddAvatarImg} />
            </TouchableOpacity>
          </View>

          <View style={styles.exitBtn}>
            <LogoutButton onPress={handleLogout} />
          </View>

          <Text style={styles.contentTitle}>{user.displayName}</Text>

          <View style={styles.fotoList}>
            {posts.length > 0 && (
              <FlatList
                data={posts}
                renderItem={({ item }) => (
                  <Post
                    onPressComment={() =>
                      navigation.navigate("Comment", { postId: item.id })
                    }
                    onPressLike={() => handleLikeToggle(item.id)}
                    onPressMap={() => navigation.navigate("Maps", { posts })}
                    postImg={item.imageUrl}
                    postName={item.namePhoto}
                    postComment={item.comments.length}
                    location={item.location.name}
                    postLike={item.likes}
                    isLiked={item.likedBy && item.likedBy.includes(userId)}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    width: "100%",
    height: "100%",
  },
  contentBox: {
    width: "100%",
    height: 665,
    backgroundColor: colors.white,
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  avatarBox: {
    width: 120,
    height: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,
    position: "relative",
    top: -60,
  },
  exitBtn: {
    position: "absolute",
    right: 10,
    top: 20,
  },
  contentTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: fonts.extraLarge,
    top: -30,
  },
  fotoList: {
    width: "100%",
    height: 500,
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
  avatarAdd: {
    position: "absolute",
    left: 107,
    top: 80,
  },
});
