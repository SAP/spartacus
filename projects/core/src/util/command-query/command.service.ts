/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, Subject, Subscription, zip } from 'rxjs';
import {
  concatMap,
  finalize,
  mergeMap,
  retry,
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
    commandFactory: (command: PARAMS) => Observable<any>,
    options?: { strategy?: CommandStrategy }
  ): Command<PARAMS, RESULT> {
    const commands$ = new Subject<PARAMS>();
    const results$ = new Subject<ReplaySubject<RESULT>>();

    let process$: Observable<any>;

    switch (options?.strategy) {
      case CommandStrategy.CancelPrevious:
      case CommandStrategy.ErrorPrevious:
        process$ = zip(commands$, results$).pipe(
          switchMap(([cmd, notifier$]) =>
            commandFactory(cmd).pipe(
              tap(notifier$),
              finalize(() =>
                options.strategy === CommandStrategy.CancelPrevious
                  ? notifier$.complete()
                  : notifier$.error(new Error('Canceled by next command'))
              )
            )
          ),
          retry()
        );
        break;

      case CommandStrategy.Parallel:
        process$ = zip(commands$, results$).pipe(
          mergeMap(([cmd, notifier$]) =>
            commandFactory(cmd).pipe(tap(notifier$))
          ),
          retry()
        );
        break;

      case CommandStrategy.Queue:
      default:
        process$ = zip(commands$, results$).pipe(
          concatMap(([cmd, notifier$]) =>
            commandFactory(cmd).pipe(tap(notifier$))
          ),
          retry()
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
