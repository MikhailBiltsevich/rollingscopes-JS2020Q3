export const Converter = {
  serialize(obj) {
    return JSON.stringify(obj);
  },

  deserialize(value) {
    let obj;
    try {
      obj = JSON.parse(value);
    } catch (e) {
      obj = undefined;
    }

    return obj;
  }
};
