import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {

        }
    }
    
export const getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

