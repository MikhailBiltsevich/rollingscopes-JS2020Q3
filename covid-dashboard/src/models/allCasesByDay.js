export default class AllCasesByDay {
  constructor(
    confirmed,
    deaths,
    recovered,
    active,
    date,
  ) {
    this.confirmed = confirmed;
    this.deaths = deaths;
    this.recovered = recovered;
    this.active = active;
    this.date = date;
  }

  get country() {
    return this.country;
  }

  set country(value) {
    this.country = value;
  }

  /**
   * Create AllCasesByDay object from json object.
   * @param {Object} obj
   * @returns AllCasesByDay object. If JSON isn't correct - undefined
   */
  static parse(obj) {
    const keys = [
      'Confirmed',
      'Deaths',
      'Recovered',
      'Date',
    ];

    const isCorrectJSON = keys.every((key) => Object.keys(obj).includes(key));
    if (isCorrectJSON) {
      return new AllCasesByDay(
        obj.Confirmed,
        obj.Deaths,
        obj.Recovered,
        obj.Active,
        obj.Date,
      );
    }

    return undefined;
  }
}
