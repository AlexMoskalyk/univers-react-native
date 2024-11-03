import React, { useState, useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { colors, fonts } from "../../styles/global";
import InputsCreate from "../components/InputsCreate";
import Button from "../components/Button";
import PhotoCamera from "../components/PhotoCamera";
import GalleryModal from "../components/GalleryModal";
import LocationFetcher from "../components/PhotoLocation";

const CreatePostsScreen = ({ navigation }) => {
  const [namePhoto, setNamePhoto] = useState("");
  const [isButtonActive, setButtonActive] = useState(false);
  const [location, setLocation] = useState(null);
  const [geocode, setGeocode] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isCameraActive, setCameraActive] = useState(false);

  const handleNameChange = (value) => {
    setNamePhoto(value);
  };

  const handleSelectPhoto = (uri) => {
    setPhotoUri(uri);
    setIsGalleryOpen(false);
  };

  useEffect(() => {
    if (namePhoto && location && photoUri) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [namePhoto, location, photoUri]);

  const reset = () => {
    setNamePhoto("");
    setLocation(null);
    setGeocode(null);
    setPhotoUri(null);
  };

  return (
    <View style={styles.container}>
      <LocationFetcher setLocation={setLocation} setGeocode={setGeocode} />

      <View style={styles.imgSection}>
        <View style={styles.imgContainer}>
          {photoUri && (
            <Image
              source={{ uri: photoUri }}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          )}

          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.image} />
          ) : isCameraActive ? (
            <PhotoCamera style={styles.came} onCapture={handleSelectPhoto} />
          ) : (
            <TouchableOpacity onPress={() => setCameraActive(true)}>
              <Text style={styles.activateCameraText}>Включити камеру</Text>
            </TouchableOpacity>
          )}
        </View>

        {photoUri ? (
          <Text style={styles.fotoWork} onPress={() => setPhotoUri(null)}>
            Видалити фото
          </Text>
        ) : (
          <TouchableOpacity onPress={() => setIsGalleryOpen(true)}>
            <Text style={styles.fotoWork}>Завантажте фото</Text>
          </TouchableOpacity>
        )}
      </View>

      <GalleryModal
        visible={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onSelectPhoto={handleSelectPhoto}
      />

      <View>
        <View style={styles.positionContainer}>
          <InputsCreate
            value={namePhoto}
            onTextChange={handleNameChange}
            placeholder="Назва..."
          />
        </View>

        <View style={[styles.positionContainer, styles.positionContainerImg]}>
          <TouchableOpacity>
            <Feather
              style={styles.inputImg}
              name="map-pin"
              size={24}
              color={colors.alt_text}
            />
          </TouchableOpacity>
          <InputsCreate
            value={location}
            placeholder="Місцевість..."
            onChangeText={setLocation}
          />
        </View>

        <Button
          onPress={() => {
            navigation.navigate("Posts");
            onSubmit();
          }}
          buttonSize="large"
          isButtonActive={isButtonActive}
        >
          Опубліковати
        </Button>

        <TouchableOpacity style={styles.treshBtn}>
          <Button buttonSize="medium">
            <Feather name="trash-2" size={24} color={colors.alt_text} />
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePostsScreen;

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
  imgSection: {
    marginBottom: 48,
  },
  imgContainer: {
    width: "100%",
    height: 240,
    backgroundColor: colors.light_gray,
    borderColor: colors.border_gray,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    overflow: "hidden",
  },
  came: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#BDBDBD30",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  fotoWork: {
    fontFamily: "roboto-regular",
    fontSize: fonts.normal,
    color: colors.text_gray,
  },
  positionContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: colors.border_gray,
    marginBottom: 16,
  },
  positionContainerImg: {
    marginRight: 20,
  },
  treshBtn: {
    alignItems: "center",
    marginTop: 120,
  },

  activateCameraText: {
    color: colors.text_gray,
    fontSize: fonts.normal,
    fontFamily: "roboto-regular",
  },
});
