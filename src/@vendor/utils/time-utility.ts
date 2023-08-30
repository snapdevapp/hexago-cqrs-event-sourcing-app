export const timerUtility = {
  /**
   * Check if ttl is less than current time.
   *
   * @param ttl
   * @param time
   */
  lessThan: (ttl: number, time: number): boolean => {
    return Date.now() - time < ttl * 60;
  },

  /**
   * Check if ttl is less than or equal current time.
   *
   * @param ttl
   * @param time
   */
  lessThanOrEqual: (ttl: number, time: number): boolean => {
    return Date.now() - time <= ttl * 60;
  },

  /**
   * Check if ttl is more than current time.
   *
   * @param ttl
   * @param time
   */
  moreThan: (ttl: number, time: number): boolean => {
    return Date.now() - time > ttl * 60;
  },

  /**
   * Check if ttl is more than or equal current time.
   *
   * @param ttl
   * @param time
   */
  moreThanOrEqual: (ttl: number, time: number): boolean => {
    return Date.now() - time >= ttl * 60;
  },
};
