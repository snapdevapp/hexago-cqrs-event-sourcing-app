import moment from 'moment';

export const timeConverter = {
  /**
   * ComputeTimeInterval is used to compute the interval between
   * a given date and current date. THe result unit time is months
   *
   * @param {Date} date
   * @returns
   */
  getTimeInterval: (date: Date): number => {
    return moment().diff(moment(date), 'months', true);
  },
};
