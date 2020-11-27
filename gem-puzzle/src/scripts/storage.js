import { Converter } from './converter';

export const Storage = {
  get(key, defaultValue) {
    const obj = Converter.deserialize(localStorage.getItem(key));
    return obj || defaultValue;
  },

  set(key, value) {
    localStorage.setItem(key, Converter.serialize(value));
  }
};
