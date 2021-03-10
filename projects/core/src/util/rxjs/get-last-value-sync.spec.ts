import { getLastValueSync } from '@spartacus/core';
import { EMPTY, from, NEVER, of } from 'rxjs';

describe('getLastValueSync', () => {
  it('should return undefined if there is no emission', () => {
    expect(getLastValueSync(EMPTY)).toBeUndefined();
    expect(getLastValueSync(NEVER)).toBeUndefined();
  });

  it('should return value synchronously', () => {
    expect(getLastValueSync(of('test'))).toEqual('test');
  });

  it('should return last value synchronously', () => {
    expect(getLastValueSync(from(['a', 'b', 'c']))).toEqual('c');
  });
});
