import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { withdrawOn } from './withdraw-on';
import { EMPTY } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('withdrawOn', () => {
  describe('when there was no emission from the notifier', () => {
    it('should emit values from source observable', () => {
      const notifier$ = EMPTY;
      const source$ = cold('-a-b--c', { a: '1', b: '2', c: '3' });
      const transformed$ = source$.pipe(withdrawOn(notifier$));
      expect(transformed$).toBeObservable(source$);
    });

    it('should emit delayed values from source observable', () => {
      const notifier$ = EMPTY;
      const source$ = cold('-a-b--c', { a: '1', b: '2', c: '3' }).pipe(
        delay(10, getTestScheduler())
      );
      const target$ = cold('--a-b--c', { a: '1', b: '2', c: '3' });
      const transformed$ = source$.pipe(withdrawOn(notifier$));
      expect(transformed$).toBeObservable(target$);
    });
  });

  describe('on notifier emission', () => {
    it('should withdraw from emitting ongoing source values', () => {
      const notifier$ = cold('a', { a: undefined });
      const source$ = hot('a', { a: '1' }).pipe(
        delay(10, getTestScheduler()),
        withdrawOn(notifier$)
      );
      const target$ = cold('');

      expect(source$).toBeObservable(target$);
    });

    it('should continue emitting source values after withdraw', () => {
      const notifier$ = cold('----a', { a: undefined });
      const source$ = hot('-a-b--c', { a: '1', b: '2', c: '3' }).pipe(
        delay(10, getTestScheduler()),
        withdrawOn(notifier$)
      );
      const target$ = cold('--a----c', { a: '1', c: '3' });

      expect(source$).toBeObservable(target$);
    });

    it('should be able to withdraw and continue multiple times', () => {
      const notifier$ = cold('----a----a', { a: undefined });
      const source$ = hot('-a-b--c-a-b-c', { a: '1', b: '2', c: '3' }).pipe(
        delay(10, getTestScheduler()),
        withdrawOn(notifier$)
      );
      const target$ = cold('--a----c---b-c', { a: '1', b: '2', c: '3' });

      expect(source$).toBeObservable(target$);
    });
  });
});
