import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const sendSOS = async () => {
    if (location) {
      try {
        await axios.post('https://sample-sos-system.onrender.com/sos', {  // Updated IP address
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          deviceInfo: {
            platform: 'mobile',
          },
        });
        Alert.alert('SOS sent successfully!');
      } catch (error) {
        console.error(error);
        Alert.alert('Failed to send SOS.');
      }
    } else {
      Alert.alert('Location not available.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SOS App</Text>
      <Button title="Send SOS" onPress={sendSOS} />
      {location && (
        <Text style={styles.location}>
          Location: {location.coords.latitude}, {location.coords.longitude}
        </Text>
      )}
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff6347',
    marginBottom: 20,
  },
  location: {
    fontSize: 16,
    color: '#4682b4',
    marginTop: 20,
  },
  error: {
    color: 'red',
  },
});
