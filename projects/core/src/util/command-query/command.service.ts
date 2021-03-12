import { Injectable, OnDestroy } from '@angular/core';
import { EMPTY, Observable, Subject, Subscription, zip } from 'rxjs';
import {
  catchError,
  concatMap,
  finalize,
  mergeMap,
  retry,
  switchMap,
  tap,
} from 'rxjs/operators';

export interface Command<P = undefined, R = unknown> {
  execute(params: P): Observable<R>;
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

  constructor() {}

  create<P = undefined, R = unknown>(
    loading: (command: P) => Observable<any>,
    options?: { strategy?: CommandStrategy }
  ): Command<P, R> {
    const commands$ = new Subject<P>();
    const results$ = new Subject<Subject<R>>();

    let process$: Observable<any>;

    switch (options?.strategy) {
      case CommandStrategy.Queue:
        process$ = zip(commands$, results$).pipe(
          concatMap(([command, notifier$]) =>
            loading(command).pipe(tap(notifier$))
          ),
          retry()
        );
        break;

      case CommandStrategy.CancelPrevious:
      case CommandStrategy.ErrorPrevious:
        process$ = zip(commands$, results$).pipe(
          switchMap(([command, notifier$]) =>
            loading(command).pipe(
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
      default:
        process$ = zip(commands$, results$).pipe(
          mergeMap(([command, notifier$]) =>
            loading(command).pipe(tap(notifier$))
          ),
          retry()
        );
    }

    this.subscriptions.add(process$.subscribe());

    return {
      execute: (parameters: P) => {
        const result = new Subject<R>();
        results$.next(result);
        commands$.next(parameters);
        return result;
      },
    };
  }

  createOld<P = undefined, R = unknown>(
    loading: (trigger: Observable<[P, Subject<R>]>) => Observable<any>
  ): Command<P, R> {
    const commands$ = new Subject<P>();
    const results$ = new Subject<Subject<R>>();

    const process$ = loading(zip(commands$, results$));

    this.subscriptions.add(
      process$
        .pipe(
          catchError(() => {
            return EMPTY;
          }),
          retry()
        )
        .subscribe()
    );

    return {
      execute: (parameters: P) => {
        const result = new Subject<R>();
        results$.next(result);
        commands$.next(parameters);
        return result;
      },
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
