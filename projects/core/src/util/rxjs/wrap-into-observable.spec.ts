import { of } from 'rxjs';
import { wrapIntoObservable } from './wrap-into-observable';

describe('wrapIntoObservable', () => {
  it('should return an Observable when given an Observable', (done) => {
    const observableValue = of('test');
    wrapIntoObservable(observableValue).subscribe((result) => {
      expect(result).toEqual(observableValue);
      done();
    });
  });

  describe('when a Promise is passed', () => {
    it('should wrap it into an Observable', (done) => {
      const promiseValue = Promise.resolve('test');
      const result = wrapIntoObservable(promiseValue);

      result.subscribe((value) => {
        expect(value).toEqual('test');
        done();
      });
    });
    it('should wrap it into an Observable', (done) => {
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
  });

  describe('when a value is passed', () => {
    it('should wrap it into an Observable', (done) => {
      const value = 'test';
      const result = wrapIntoObservable(value);

      result.subscribe((val) => {
        expect(val).toEqual(value);
        done();
      });
    });
    it('should wrap it into an Observable', (done) => {
      const obj = { then: 'not a function' };
      const promiseValue = Promise.resolve(obj);
      const result2 = wrapIntoObservable(promiseValue);

      result2.subscribe((value) => {
        expect(value).toEqual(obj);
        done();
      });
    });
  });
});
