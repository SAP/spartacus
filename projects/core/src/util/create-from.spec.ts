import { createFrom } from './create-from';

const ENTRY_VALUE_ONE = 1;
const ENTRY_VALUE_TWO = 2;
const ENTRY_VALUE_THREE = 3;

describe('createFrom', () => {
  it('should create a class instance and with properties from the the argument object', () => {
    class TestEvent {
      a: number;
      b: number;
      c: number;
    }
    const testEvent = createFrom(TestEvent, { a: 1, b: 2, c: 3 });
    expect(Object.entries(testEvent)).toEqual([
      ['a', ENTRY_VALUE_ONE],
      ['b', ENTRY_VALUE_TWO],
      ['c', ENTRY_VALUE_THREE],
    ]);
    expect(testEvent instanceof TestEvent).toBeTruthy();
  });
});
