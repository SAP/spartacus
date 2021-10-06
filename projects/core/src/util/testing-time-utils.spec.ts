import { TestingTimeUtils } from './testing-time-utils';

describe('TestingTimeUtils', () => {
  describe('fakeDateTimezoneOffset', () => {
    it('should modify default offset', () => {
      const newOffset = -120;
      TestingTimeUtils.fakeDateTimezoneOffset(newOffset, () => {
        const defaultOffset = new Date().getTimezoneOffset();
        expect(defaultOffset).toEqual(newOffset);
      });
    });
  });

  describe('fakeToLocaleTimeString', () => {
    it('should modify default locale time string', () => {
      const newTime = '10:00';
      TestingTimeUtils.fakeToLocaleTimeString(newTime, () => {
        const defaultTime = new Date().toLocaleTimeString();
        expect(defaultTime).toEqual(newTime);
      });
    });
  });
});
