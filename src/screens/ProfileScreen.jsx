// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   StyleSheet,
//   View,
//   Text,
//   ImageBackground,
//   Image,
//   FlatList,
// } from "react-native";

// import { selectUser } from "../redux/reducers/authSelector";
// import { getPosts, toggleLike } from "../redux/reducers/postOperation";
// import { logoutDB } from "../redux/reducers/authOperation";
// import { selectUsersPosts } from "../redux/reducers/postSelector";
// import Post from "../components/Post";
// import LogoutButton from "../components/LogoutButton";

// import { Colors, Fonts } from "../../styles/global";
// import ImageBG from "../../assets/images/PhotoBG.jpg";

// const ProfileScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const user = useSelector(selectUser);
//   const userId = user.uid;
//   const selectPostsByUserId = selectUsersPosts(userId);
//   const posts = useSelector((state) => selectPostsByUserId(state));

//   const handleLogout = () => {
//     dispatch(logoutDB());
//   };

//   useEffect(() => {
//     dispatch(getPosts());
//   }, [dispatch]);

//   const handleLikeToggle = (postId) => {
//     dispatch(toggleLike({ postId, userId }));
//   };

//   return (
//     <View style={styles.container}>
//       <ImageBackground source={ImageBG} style={styles.imageBg}>
//         <View style={styles.contentBox}>
//           <Image style={styles.avatarBox} source={{ uri: user.photoURL }} />

//           <View style={styles.exitBtn}>
//             <LogOutButton onPress={handleLogout} />
//           </View>

//           <Text style={styles.contentTitle}>{user.displayName}</Text>

//           <View style={styles.fotoList}>
//             {posts.length > 0 && (
//               <FlatList
//                 data={posts}
//                 renderItem={({ item }) => (
//                   <Posts
//                     onPressComment={() =>
//                       navigation.navigate("Comment", { postId: item.id })
//                     }
//                     onPressLike={() => handleLikeToggle(item.id)}
//                     onPressMap={() => navigation.navigate("Maps", { posts })}
//                     postImg={item.imageUrl}
//                     postName={item.namePhoto}
//                     postComment={item.comments.length}
//                     location={item.location.name}
//                     postLike={item.likes}
//                     isLiked={item.likedBy && item.likedBy.includes(userId)}
//                   />
//                 )}
//                 keyExtractor={(item) => item.id}
//               />
//             )}
//           </View>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   imageBg: {
//     width: "100%",
//     height: "100%",
//   },
//   contentBox: {
//     width: "100%",
//     height: 665,
//     backgroundColor: Colors.whites,
//     marginTop: "auto",
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     alignItems: "center",
//     paddingHorizontal: 16,
//   },
//   avatarBox: {
//     width: 120,
//     height: 120,
//     backgroundColor: Colors.light_gray,
//     borderRadius: 16,
//     position: "relative",
//     top: -60,
//   },
//   exitBtn: {
//     position: "absolute",
//     right: 10,
//     top: 20,
//   },
//   contentTitle: {
//     fontFamily: "Roboto-Medium",
//     fontSize: Fonts.extraLarge,
//     top: -30,
//   },
//   fotoList: {
//     width: "100%",
//     height: 500,
//   },
// });
