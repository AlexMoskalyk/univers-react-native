import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import { colors, fonts } from "../../styles/global";
import Post from "../components/Post";
import postData from "../../assets/data/postData";
import {
  selectAllPosts,
  selectIsLoading,
  selectPostError,
} from "../redux/reducers/posts/postSelector";
import { getPosts, toggleLike } from "../redux/reducers/posts/postOperations";
import { selectUser } from "../redux/reducers/authentication/authSelector";

const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const userId = user.userId;
  const error = useSelector(selectPostError);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const handleLikeToggle = (postId) => {
    dispatch(toggleLike({ postId, userId }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image style={styles.userAvatar} source={{ uri: user.photoURL }} />
        <View>
          <Text style={styles.userName}>{user.displayName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.fotoList}>
        {error && <Text>error:{`${error}`}</Text>}
        {isLoading && (
          <ActivityIndicator
            size="150"
            style={styles.loaders}
            color={colors.orange}
          />
        )}
        {!isLoading > 0 && (
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
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    backgroundColor: colors.white,
    borderColor: colors.light_gray,
    borderWidth: 1,
  },
  userInfo: {
    flexDirection: "row",
    marginBottom: 32,
    alignItems: "center",
  },
  userAvatar: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: fonts.medium,
    color: colors.black_primary,
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: fonts.small,
    color: colors.black_primary,
  },
  fotoList: {
    width: "100%",
    height: "87%",
  },
  itemImg: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontFamily: "Roboto-Medium",
    fontSize: fonts.normal,
    color: colors.black_primary,
    marginBottom: 8,
  },
  itemInform: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemArea: {
    flexDirection: "row",
  },
  itemCommentNum: {
    fontFamily: "Roboto-Medium",
    fontSize: fonts.normal,
    color: colors.text_gray,
    marginLeft: 5,
  },
});
