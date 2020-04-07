import { createFrom } from './create-from';

describe('createFrom', () => {
  it('should create a class instance and with properties from the the argument object', () => {
    class TestEvent {
      a: number;
      b: number;
      c: number;
    }
    const testEvent = createFrom(TestEvent, { a: 1, b: 2, c: 3 });
    expect(Object.entries(testEvent)).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    expect(testEvent instanceof TestEvent).toBeTruthy();
  });
});
