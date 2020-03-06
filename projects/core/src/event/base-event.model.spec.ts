import { BaseEvent } from './base-event.model';

describe('BaseEvent', () => {
  describe('constructor', () => {
    it('should copy all properties of the argument object to its properties', () => {
      class TestEvent extends BaseEvent<TestEvent> {
        a: number;
        b: number;
        c: number;
      }
      const testEvent = new TestEvent({ a: 1, b: 2, c: 3 });
      expect(Object.entries(testEvent)).toEqual([['a', 1], ['b', 2], ['c', 3]]);
      expect(testEvent instanceof TestEvent).toBeTruthy();
    });
  });
});
