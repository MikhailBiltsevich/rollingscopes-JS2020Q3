export default class SummaryStat {
  constructor(
    newConfirmed,
    totalConfirmed,
    newDeaths,
    totalDeaths,
    newRecovered,
    totalRecovered,
    date,
  ) {
    this.newConfirmed = newConfirmed;
    this.totalConfirmed = totalConfirmed;
    this.newDeaths = newDeaths;
    this.totalDeaths = totalDeaths;
    this.newRecovered = newRecovered;
    this.totalRecovered = totalRecovered;
    this.date = date;
  }

  /**
   * Create SummaryStat object from json object.
   * @param {Object} obj
   * @returns SummaryStat object. If JSON isn't correct - undefined
   */
  static parse(obj) {
    const keys = [
      'NewConfirmed',
      'TotalConfirmed',
      'NewDeaths',
      'TotalDeaths',
      'NewRecovered',
      'TotalRecovered'];

    const isCorrectJSON = keys.every((key) => Object.keys(obj).includes(key));
    if (isCorrectJSON) {
      return new SummaryStat(
        obj.NewConfirmed,
        obj.TotalConfirmed,
        obj.NewDeaths,
        obj.TotalDeaths,
        obj.NewRecovered,
        obj.TotalRecovered,
        obj.Date || undefined,
      );
    }

    return undefined;
  }
}
