import { backOff } from './back-off';
import { BehaviorSubject, defer, firstValueFrom, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { vi } from 'vitest';
import { HttpErrorModel } from '../../model/misc.model';
import { isJaloError } from '../occ-http-error-handlers';

const doBackOff = () => true;

describe(`backOff`, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe(`when the 'shouldRetry' is not provided`, () => {
    describe(`operator will always retry, no matter what the error is`, () => {
      it(`should be able to successfully recover`, async () => {
        const error = 'random error';
        const recoveredValue = 'xxx';

        let calledTimes = -1;
        const source$ = defer(() => {
          calledTimes++;
          if (calledTimes === 3) {
            return of(recoveredValue);
          }
          return throwError(() => error);
        });
        const test$ = source$.pipe(backOff());

        const resultPromise = firstValueFrom(test$);
        // when using default options: 1*1*300 + 2*2*300 + 3*3*300 = 4200ms
        await vi.advanceTimersByTimeAsync(4200);

        expect(await resultPromise).toEqual(recoveredValue);
      });

      it(`should NOT be able to recover`, async () => {
        const initialError = 'error';

        const source$ = throwError(() => initialError);
        const test$ = source$.pipe(backOff());

        const resultPromise = firstValueFrom(test$);
        // when using default options: 1*1*300 + 2*2*300 + 3*3*300 = 4200ms
        await vi.advanceTimersByTimeAsync(4200);

        await expect(resultPromise).rejects.toEqual(initialError);
      });
    });
  });

  describe(`when the source does not throw an error`, () => {
    it(`should not kick in`, async () => {
      const initialValue = 'xxx';

      const source$ = of(initialValue);
      const test$ = source$.pipe(backOff({ shouldRetry: doBackOff }));

      const result = await firstValueFrom(test$);
      expect(result).toEqual(initialValue);
    });
  });

  describe(`when the source throws an error`, () => {
    describe(`shouldRetry function`, () => {
      describe(`evaluates to false`, () => {
        it(`should not retry and just re-throw the error`, async () => {
          const source$ = throwError(() => 'error');
          const test$ = source$.pipe(backOff({ shouldRetry: () => false }));

          await expect(firstValueFrom(test$)).rejects.toEqual('error');
        });
      });

      describe(`evaluates to true`, () => {
        describe(`and the retry is unsuccessful`, () => {
          it(`should re-throw the initial error`, async () => {
            const initialError = 'error';

            const source$ = throwError(() => initialError);
            const test$ = source$.pipe(backOff({ shouldRetry: doBackOff }));

            const resultPromise = firstValueFrom(test$);
            // when using default options: 1*1*300 + 2*2*300 + 3*3*300 = 4200ms
            await vi.advanceTimersByTimeAsync(4200);

            await expect(resultPromise).rejects.toEqual(initialError);
          });
        });

        describe(`and retry is successful`, () => {
          it(`should recover`, async () => {
            const initialError = 'error';
            const recoveredValue = 'xxx';

            const error$ = throwError(() => initialError);
            const recovery$ = new BehaviorSubject<boolean>(false);
            const source$ = recovery$.pipe(
              switchMap((recovered) =>
                recovered ? of(recoveredValue) : error$
              )
            );

            let errorResult: string | undefined;
            let result: string | undefined;
            const subscription = source$
              .pipe(backOff({ shouldRetry: doBackOff }))
              .subscribe({
                next: (value) => (result = value),
                error: (value) => (errorResult = value),
              });

            // some time passed, and while waiting to retry, the source$ was able to recover
            await vi.advanceTimersByTimeAsync(200);
            // the source$ was able to recover
            recovery$.next(true);
            // wait until the retry to happen
            await vi.advanceTimersByTimeAsync(100);

            expect(result).toEqual(recoveredValue);
            expect(errorResult).toBeFalsy();

            subscription.unsubscribe();
          });
        });
      });

      describe(`when it should retry for a specific error, but another error occurs`, () => {
        it(`should stop retrying and re-throw`, async () => {
          const initialError: HttpErrorModel = {
            details: [{ type: 'JaloObjectNoLongerValidError' }],
          };
          const differentError: HttpErrorModel = {
            details: [{ type: '500 internal server error' }],
          };

          const error$ = new BehaviorSubject<HttpErrorModel>(initialError);
          const source$ = error$.pipe(
            switchMap((error) => throwError(() => error))
          );

          let errorResult: HttpErrorModel | undefined;
          let result: HttpErrorModel | undefined;
          const subscription = source$
            .pipe(backOff({ shouldRetry: isJaloError }))
            .subscribe({
              next: (value) => (result = value),
              error: (value) => (errorResult = value),
            });

          // first retry happened
          await vi.advanceTimersByTimeAsync(200);
          error$.next(differentError);
          // a different error occurs now
          await vi.advanceTimersByTimeAsync(100);

          expect(errorResult).toEqual(differentError);
          expect(result).toBeFalsy();

          subscription.unsubscribe();
        });
      });
    });

    describe(`when options are provided`, () => {
      it(`should use the provided maxTries option`, async () => {
        const initialError = 'error';

        const source$ = throwError(() => initialError);
        const test$ = source$.pipe(
          backOff({ shouldRetry: doBackOff, maxTries: 2 })
        );

        const resultPromise = firstValueFrom(test$);
        // when using default options: 1*1*300 + 2*2*300 = 1500ms
        await vi.advanceTimersByTimeAsync(1500);

        await expect(resultPromise).rejects.toEqual(initialError);
      });

      it(`should use the provided delay option`, async () => {
        const initialError = 'error';

        const source$ = throwError(() => initialError);
        const test$ = source$.pipe(
          backOff({ shouldRetry: doBackOff, delay: 100 })
        );

        const resultPromise = firstValueFrom(test$);
        // when using default options: 1*1*100 + 2*2*100 + 3*3*100 = 1400ms
        await vi.advanceTimersByTimeAsync(1400);

        await expect(resultPromise).rejects.toEqual(initialError);
      });

      it(`should use both the provided maxTries and delay options`, async () => {
        const initialError = 'error';

        const source$ = throwError(() => initialError);
        const test$ = source$.pipe(
          backOff({ shouldRetry: doBackOff, maxTries: 2, delay: 100 })
        );

        const resultPromise = firstValueFrom(test$);
        // when using default options: 1*1*100 + 2*2*100 = 500ms
        await vi.advanceTimersByTimeAsync(500);

        await expect(resultPromise).rejects.toEqual(initialError);
      });
    });
  });
});
