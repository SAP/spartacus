import { of } from 'rxjs';
import { wrapIntoObservable } from './wrap-into-observable';

describe('wrapIntoObservable', () => {
  it('should return an Observable when given an Observable', () => {
    const observableValue = of('test');
    const result = wrapIntoObservable(observableValue);
    expect(result).toEqual(observableValue);
  });

  it('should wrap a Promise into an Observable', (done) => {
    const promiseValue = Promise.resolve('test');
    const result = wrapIntoObservable(promiseValue);

    result.subscribe((value) => {
      expect(value).toEqual('test');
    });
    const obj = {
      then: function (): void {},
    };
    const promiseValue2 = Promise.resolve(obj);
    const result2 = wrapIntoObservable(promiseValue2);

    result2.subscribe((value) => {
      expect(value).toEqual(obj);
      done();
    });
  });

  it('should wrap a value into an Observable', (done) => {
    const value = 'test';
    const result = wrapIntoObservable(value);

    result.subscribe((val) => {
      expect(val).toEqual(value);
    });

    const obj = { then: 'not a function' };
    const promiseValue = Promise.resolve(obj);
    const result2 = wrapIntoObservable(promiseValue);

    result2.subscribe((value) => {
      expect(value).toEqual(obj);
      done();
    });
  });
});
