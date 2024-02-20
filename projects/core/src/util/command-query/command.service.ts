/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import {
  EMPTY,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
  defer,
  zip,
} from 'rxjs';
import {
  TapObserver,
  catchError,
  concatMap,
  finalize,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';

export abstract class Command<PARAMS = undefined, RESULT = unknown> {
  abstract execute(parameters: PARAMS): Observable<RESULT>;
}

export enum CommandStrategy {
  Parallel,
  Queue,
  CancelPrevious,
  ErrorPrevious,
  // SkipIfOngoing,
  // ErrorIfOngoing
}

@Injectable({
  providedIn: 'root',
})
export class CommandService implements OnDestroy {
  protected subscriptions: Subscription = new Subscription();

  constructor() {
    // Intentional empty constructor
  }

  create<PARAMS = undefined, RESULT = unknown>(
    commandFactory: (command: PARAMS) => Observable<RESULT>,
    options?: { strategy?: CommandStrategy }
  ): Command<PARAMS, RESULT> {
    const commands$ = new Subject<PARAMS>();
    const results$ = new Subject<ReplaySubject<RESULT>>();

    // We have to specify selectively the handlers after RxJS version 7.3.0.
    // Otherwise, the `unsubscribe` handler would be forwarded implicitly
    // to `notifier$` when calling `tap(notifier$)`.
    // But we don't want to forward `unsubscribe`, in particular.
    // To see more details, please check: https://github.com/ReactiveX/rxjs/pull/6527
    const notify = (
      notifier$: ReplaySubject<RESULT>
    ): Partial<TapObserver<RESULT>> => ({
      next: (x) => notifier$.next(x),
      error: (e) => notifier$.error(e),
      complete: () => notifier$.complete(),
    });

    let process$: Observable<unknown>;

    switch (options?.strategy) {
      case CommandStrategy.CancelPrevious:
      case CommandStrategy.ErrorPrevious:
        process$ = zip(commands$, results$).pipe(
          switchMap(([cmd, notifier$]) =>
            defer(() => commandFactory(cmd)).pipe(
              tap(notify(notifier$)),
              catchError(() => EMPTY),
              finalize(() => {
                // do not overwrite existing existing ending state
                if (!notifier$.closed && !notifier$.hasError) {
                  // command has not ended yet, so close notifier$ according to strategy
                  if (options.strategy === CommandStrategy.ErrorPrevious) {
                    notifier$.error(new Error('Canceled by next command'));
                  } else {
                    notifier$.complete();
                  }
                }
              })
            )
          )
        );
        break;

      case CommandStrategy.Parallel:
        process$ = zip(commands$, results$).pipe(
          mergeMap(([cmd, notifier$]) =>
            defer(() => commandFactory(cmd)).pipe(
              tap(notify(notifier$)),
              catchError(() => EMPTY)
            )
          )
        );
        break;

      case CommandStrategy.Queue:
      default:
        process$ = zip(commands$, results$).pipe(
          concatMap(([cmd, notifier$]) =>
            defer(() => commandFactory(cmd)).pipe(
              tap(notify(notifier$)),
              catchError(() => EMPTY)
            )
          )
        );
        break;
    }

    this.subscriptions.add(process$.subscribe());

    const command: Command<PARAMS, RESULT> = new (class extends Command<
      PARAMS,
      RESULT
    > {
      execute = (parameters: PARAMS) => {
        const result$ = new ReplaySubject<RESULT>();
        results$.next(result$);
        commands$.next(parameters);
        return result$;
      };
    })();

    return command;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
