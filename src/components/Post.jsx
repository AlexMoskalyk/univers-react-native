import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { colors, fonts } from "../../styles/global";

const Posts = ({
  postImg,
  postName,
  postComment,
  postLike,
  location,
  onPressComment,
  onPressMap,
}) => {
  return (
    <View>
      <View style={styles.item}>
        <Image style={styles.itemImg} source={postImg} />
        <Text style={styles.itemName}>{postName}</Text>
      </View>

      <View style={styles.itemInform}>
        <View style={styles.itemArea}>
          <TouchableOpacity
            onPress={onPressComment}
            style={styles.itemAreaMarg}
          >
            <Feather
              color={postComment === 0 ? colors.alt_text : colors.orange}
              name="message-circle"
              size={24}
            />
            <Text style={styles.itemCommentNum}>{postComment}</Text>
          </TouchableOpacity>

          {postLike !== undefined && postLike !== null && (
            <TouchableOpacity style={styles.itemArea}>
              <AntDesign name="like2" size={24} color={colors.alt_text} />
              <Text style={styles.itemCommentNum}>{postLike}</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={onPressMap} style={styles.itemArea}>
          <Feather name="map-pin" size={24} color={colors.alt_text} />
          <Text style={styles.itemAddress}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  item: {},
  itemImg: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontFamily: "roboto-medium",
    fontSize: fonts.normal,
    color: colors.black_primary,
    marginBottom: 8,
  },
  itemInform: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  itemArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemAreaMarg: {
    flexDirection: "row",
    marginRight: 24,
  },
  itemCommentNum: {
    fontFamily: "roboto-medium",
    fontSize: fonts.normal,
    color: colors.alt_text,
    marginLeft: 5,
  },
  itemAddress: {
    fontFamily: "roboto-medium",
    fontSize: fonts.normal,
    color: colors.black_primary,
    marginLeft: 5,
    textDecorationLine: "underline",
  },
});
