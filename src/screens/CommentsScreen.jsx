import { StyleSheet, View, FlatList, TextInput, Image } from "react-native";
import Comment from "../components/Comment";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "../components/Button";
import postComment from "../../assets/data/postComment";
import { colors } from "../../styles/global";

const CommentsScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.itemImg} source={route.params.postImg} />
        <FlatList
          data={postComment}
          renderItem={({ item, index }) => (
            <Comment
              textComment={item.textComment}
              dateComment={item.dateComment}
              userAvatar={item.userAvatar}
              isEven={index % 2 === 1}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.alt_text}
          placeholder="Коментувати..."
        />
        <View style={styles.buttonWrapper}>
          <Button
            buttonSize="small"
            isButtonActive={true}
            onPress={() => console.log("Pressed")}
          >
            <AntDesign name="arrowup" size={24} color={colors.white} />
          </Button>
        </View>
      </View>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
  itemImg: {
    width: "100%",
    height: 240,
    backgroundColor: colors.light_gray,
    borderRadius: 8,
    marginBottom: 32,
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: colors.border_gray,
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 15,
    paddingRight: 60,
    backgroundColor: colors.light_gray,
  },
  buttonWrapper: {
    position: "absolute",
    right: 10,
    top: 8,
  },
});
