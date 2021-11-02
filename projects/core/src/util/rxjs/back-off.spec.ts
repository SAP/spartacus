import { fakeAsync, tick } from '@angular/core/testing';
import { backOff } from '@spartacus/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const doBackOff = () => true;

describe('backOff', () => {
  describe('when the source does not throw an error', () => {
    it('should not kick in', (done) => {
      const initialValue = 'xxx';

      const source$ = of(initialValue);
      const test$ = source$.pipe(backOff(doBackOff));

      test$.subscribe((result) => {
        expect(result).toEqual(initialValue);
        done();
      });
    });
  });

  describe('when the source throws an error', () => {
    describe('errFn', () => {
      describe('evaluates to false', () => {
        it('should not retry and just re-throw the error', (done) => {
          const source$ = throwError('error');
          const test$ = source$.pipe(backOff(() => false));

          test$.subscribe({
            error: (result) => {
              expect(result).toEqual('error');
              done();
            },
          });
        });
      });

      describe('evaluates to true', () => {
        describe('and the retry is unsuccessful', () => {
          it('should re-throw the initial error', fakeAsync(() => {
            const initialError = 'error';

            const source$ = throwError(initialError);
            const test$ = source$.pipe(backOff(doBackOff));

            let result: string | undefined;
            test$.subscribe({ error: (err) => (result = err) });
            // when using default options: 1*1*300 + 2*2*300 + 3*3*300 = 4200ms
            tick(4200);

            expect(result).toEqual(initialError);
          }));
        });

        describe('and retry is successful', () => {
          it('should recover', fakeAsync(() => {
            const initialError = 'error';
            const recoveredValue = 'xxx';

            const error$ = throwError(initialError);
            // at first, we throw an error
            const recovery$ = new BehaviorSubject<boolean>(false);
            const source$ = recovery$.pipe(
              switchMap((recovered) =>
                recovered ? of(recoveredValue) : error$
              )
            );

            let errorResult: string | undefined;
            let result: string | undefined;
            source$.pipe(backOff(doBackOff)).subscribe({
              next: (value) => (result = value),
              error: (value) => (errorResult = value),
            });

            // some time passed, and while waiting to retry, the source$ was able to recover
            tick(200);
            // the source$ was able to recover
            recovery$.next(true);
            // wait until the retry to happen
            tick(100);

            expect(result).toEqual(recoveredValue);
            expect(errorResult).toBeFalsy();
          }));
        });
      });

      describe('when it should retry for a specific error, but then another happens', () => {
        it('should stop retrying and re-throw', fakeAsync(() => {
          const initialError = 'jalo error';
          const differentError = '500 internal server error';

          const error$ = new BehaviorSubject<string>(initialError);
          const source$ = error$.pipe(switchMap((error) => throwError(error)));

          let errorResult: string | undefined;
          let result: string | undefined;
          source$
            .pipe(
              backOff(
                // we want to handle only the jalo error
                (err) => err === initialError
              )
            )
            .subscribe({
              next: (value) => (result = value),
              error: (value) => (errorResult = value),
            });

          // first retry happened
          tick(200);
          error$.next(differentError);
          // a different error occurs now
          tick(100);

          expect(errorResult).toEqual(differentError);
          expect(result).toBeFalsy();
        }));
      });
    });

    describe('when options are provided', () => {
      it('should use the provided maxTries option', fakeAsync(() => {
        const initialError = 'error';

        const source$ = throwError(initialError);
        const test$ = source$.pipe(backOff(doBackOff, { maxTries: 2 }));

        let result: string | undefined;
        test$.subscribe({ error: (err) => (result = err) });
        // when using default options: 1*1*300 + 2*2*300 = 1500ms
        tick(1500);

        expect(result).toEqual(initialError);
      }));

      it('should use the provided delay option', fakeAsync(() => {
        const initialError = 'error';

        const source$ = throwError(initialError);
        const test$ = source$.pipe(backOff(doBackOff, { delay: 100 }));

        let result: string | undefined;
        test$.subscribe({ error: (err) => (result = err) });
        // when using default options: 1*1*100 + 2*2*100 + 3*3*100 = 1400ms
        tick(1400);

        expect(result).toEqual(initialError);
      }));

      it('should use both the provided maxTries and delay options', fakeAsync(() => {
        const initialError = 'error';

        const source$ = throwError(initialError);
        const test$ = source$.pipe(
          backOff(doBackOff, { maxTries: 2, delay: 100 })
        );

        let result: string | undefined;
        test$.subscribe({ error: (err) => (result = err) });
        // when using default options: 1*1*100 + 2*2*100 = 500ms
        tick(500);

        expect(result).toEqual(initialError);
      }));
    });
  });
});
