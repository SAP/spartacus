import { createFrom } from './create-from';

const SECOND_ENTRY = 2;
const THIRD_ENTRY = 3;

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
      ['b', SECOND_ENTRY],
      ['c', THIRD_ENTRY],
    ]);
    expect(testEvent instanceof TestEvent).toBeTruthy();
  });
});
