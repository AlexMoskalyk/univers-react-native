import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

const PhotoLocation = ({ setLocation, setGeocode }) => {
  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);

      if (status === "granted") {
        let geoLoc = await Location.getCurrentPositionAsync({});
        setGeocode(geoLoc);

        const grantedLocation = await Location.reverseGeocodeAsync(
          geoLoc.coords
        );
        const country = grantedLocation[0]["country"];
        const city = grantedLocation[0]["city"];
        setLocation(`${country}, ${city}`);
      } else {
        console.log("Permission to access location was denied");
      }
    };

    fetchLocation();
  }, []);

  return null;
};

export default PhotoLocation;
