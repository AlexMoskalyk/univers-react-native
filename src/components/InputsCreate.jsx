import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { colors } from "../../styles/global";

const InputsCreate = ({ placeholder, onTextChange, value }) => {
  return (
    <TextInput
      onChangeText={onTextChange}
      value={value}
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={colors.alt_text}
    />
  );
};

export default InputsCreate;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
  },
});
