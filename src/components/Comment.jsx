import { StyleSheet, Text, View, Image } from "react-native";
import { colors, fonts } from "../../styles/global";

const Comment = ({ textComment, dateComment, userAvatar, isEven }) => {
  return (
    <View
      style={[
        styles.containerComments,
        isEven ? styles.evenComment : styles.oddComment,
      ]}
    >
      {!isEven && (
        <Image
          style={[styles.containerAvatar, styles.avatarLeft]}
          source={userAvatar}
        />
      )}
      <View style={styles.containerText}>
        <Text style={styles.text}>{textComment}</Text>
        <View>
          <Text style={styles.textData}>{dateComment}</Text>
        </View>
      </View>
      {isEven && (
        <Image
          style={[styles.containerAvatar, styles.avatarRight]}
          source={userAvatar}
        />
      )}
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  containerComments: {
    flexDirection: "row",
    marginBottom: 16,
  },
  evenComment: {
    justifyContent: "flex-end",
  },
  oddComment: {
    justifyContent: "flex-start",
  },
  containerAvatar: {
    width: 28,
    height: 28,
    backgroundColor: colors.light_gray,
    borderRadius: 28,
  },
  containerText: {
    backgroundColor: colors.light_gray,
    borderRadius: 8,
    padding: 16,
    maxWidth: "70%",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: fonts.medium,
  },
  textData: {
    fontFamily: "Roboto-Regular",
    fontSize: fonts.extraSmall,
    color: colors.alt_text,
  },
  avatarLeft: {
    marginRight: 16,
  },
  avatarRight: {
    marginLeft: 16,
  },
});
