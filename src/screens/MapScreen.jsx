import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { colors } from "../../styles/global";

const MapScreen = ({ route }) => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    if (!location) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        }

        let location = await Location.getCurrentPositionAsync({});

        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(coords);
      })();
    }
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: location ? location.latitude : 37.78825,
          longitude: location ? location.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
      >
        {location !== null && (
          <Marker
            title="I am here"
            description="Hello"
            onPress={() => console.log("marker is pressed")}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
});
