import { TouchableOpacity } from "react-native";
import AddPhotoIcon from "../../icons/AddPhotoIcon";

const AddPhotoButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AddPhotoIcon />
    </TouchableOpacity>
  );
};

export default AddPhotoButton;
