import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Button, Alert, Platform, Linking } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  // Function to handle calling the emergency service
  const dialNumber = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="call" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Emergency Contacts</ThemedText>
      </ThemedView>

      <View style={styles.buttonContainer}>
        <Button
          title="Call Police (100)"
          onPress={() => dialNumber('100')}
          color="#FF6347"
        />
        <Button
          title="Call Fire Engine (101)"
          onPress={() => dialNumber('101')}
          color="#4682B4"
        />
        <Button
          title="Call Ambulance (108)"
          onPress={() => dialNumber('108')}
          color="#32CD32"
        />
        <Button
          title="Call Emergency Services (112)"
          onPress={() => dialNumber('112')}
          color="#FF4500"
        />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 15,
  },
});
