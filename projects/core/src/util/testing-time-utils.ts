export class TestingTimeUtils {
  static fakeToLocaleTimeString(mockTime: string, callback: Function): any {
    const original = Date.prototype.toLocaleTimeString;
    Date.prototype.toLocaleTimeString = () => mockTime;
    callback();
    Date.prototype.toLocaleTimeString = original;
  }

  static fakeDateTimezoneOffset(offset: number, callback: Function): any {
    const original = Date.prototype.getTimezoneOffset;
    Date.prototype.getTimezoneOffset = () => offset;
    callback();
    Date.prototype.getTimezoneOffset = original;
  }
}
