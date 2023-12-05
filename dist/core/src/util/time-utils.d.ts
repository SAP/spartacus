export declare class TimeUtils {
    /**
     * Returns the local timezone in a format that can be appended to a date-like string.
     * @param invert (default: false): returns the opposite operator relative to the local timezone
     *
     * @example
     * When locale is set to a CEST timezone, `getLocalTimezoneOffset()` returns '+02:00'
     * and `getLocalTimezoneOffset(true)` returns '-02:00'
     */
    static getLocalTimezoneOffset(invert?: boolean): string;
    static convertDateToDatetime(date: string, endOfDay?: boolean): string;
    static convertDatetimeToDate(datetime: string): string;
}
