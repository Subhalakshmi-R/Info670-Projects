import AsyncStorage from '@react-native-async-storage/async-storage';

export const getPets = async () => {
  const json = await AsyncStorage.getItem('pets');
  return json ? JSON.parse(json) : [];
};

export const savePet = async (pet) => {
  const pets = await getPets();
  pets.push(pet);
  await AsyncStorage.setItem('pets', JSON.stringify(pets));
};
