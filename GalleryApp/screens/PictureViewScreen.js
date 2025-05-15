import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PictureViewScreen = ({ route, navigation }) => {
  const { image, caption } = route.params;
  const [showCaption, setShowCaption] = useState(true);

  useEffect(() => {
    const loadSetting = async () => {
      const setting = await AsyncStorage.getItem('showCaptions');
      if (setting !== null) {
        setShowCaption(setting === 'true');
      }
    };
    loadSetting();
  }, []);

  return (
    <View style={styles.container}>
      {showCaption && <Text style={styles.caption}>{caption}</Text>}
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Button
        mode="contained"
        icon="arrow-left"
        onPress={() => navigation.goBack()}
      >
        Back to Gallery
      </Button>
    </View>
  );
};

export default PictureViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  caption: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 400,
    marginBottom: 16,
  },
});
