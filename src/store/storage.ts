import {MMKV} from 'react-native-mmkv';

export const createStorage = (storage: any) => ({
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve(true);
  },
});

const storage = createStorage(new MMKV());
export default storage;
