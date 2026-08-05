import { firstValueFrom, of } from 'rxjs';
import { wrapIntoObservable } from './wrap-into-observable';

describe('wrapIntoObservable', () => {
  it('should return an Observable when given an Observable', async () => {
    const observableValue = of('test');
    const wrapped$ = wrapIntoObservable(observableValue);

    const value = await firstValueFrom(wrapped$);
    expect(value).toEqual('test');
  });

  describe('when a Promise is passed', () => {
    it('1. should wrap it into an Observable', async () => {
      const promiseValue = Promise.resolve('test');
      const result = wrapIntoObservable(promiseValue);

      const value = await firstValueFrom(result);
      expect(value).toEqual('test');
    });
    it('2. should wrap it into an Observable', async () => {
      const obj = {
        x: function (): void {},
      };
      const promiseValue2 = Promise.resolve(obj);
      const result2 = wrapIntoObservable(promiseValue2);

      const value = await firstValueFrom(result2);
      expect(value).toEqual(obj);
    });
  });

  describe('when a value is passed', () => {
    it('1. should wrap it into an Observable', async () => {
      const value = 'test';
      const result = wrapIntoObservable(value);

      const valFromStream = await firstValueFrom(result);
      expect(valFromStream).toEqual(value);
    });
    it('2. should wrap it into an Observable', async () => {
      const obj = { then: 'not a function' };
      const promiseValue = Promise.resolve(obj);
      const result2 = wrapIntoObservable(promiseValue);

      const value = await firstValueFrom(result2);
      expect(value).toEqual(obj);
    });
  });
});
