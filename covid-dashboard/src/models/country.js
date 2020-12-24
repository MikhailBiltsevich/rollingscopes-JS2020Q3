export default class Country {
  constructor(title, slug, ISO2, summaryStat) {
    this.title = title;
    this.slug = slug;
    this.ISO2 = ISO2;
    this.summaryStat = summaryStat;
  }

  /**
   * Create Country object from json object.
   * @param {Object} obj
   * @returns Country object. If JSON isn't correct - undefined
   */
  static parse(obj) {
    const keys = ['Country', 'Slug', 'ISO2'];
    const isCorrectJSON = keys.every((key) => Object.keys(obj).includes(key));
    if (isCorrectJSON) {
      return new Country(obj.Country, obj.Slug, obj.ISO2);
    }

    return undefined;
  }
}
