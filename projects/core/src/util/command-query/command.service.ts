import { Injectable, OnDestroy } from '@angular/core';
import { EMPTY, Observable, Subject, Subscription, zip } from 'rxjs';
import {
  catchError,
  concatMap,
  finalize,
  map,
  mergeMap,
  retry,
  switchMap,
  tap,
} from 'rxjs/operators';

export abstract class Command<P = undefined, R = unknown> {
  abstract execute(params: P): Observable<R>;
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
      case CommandStrategy.CancelPrevious:
      case CommandStrategy.ErrorPrevious:
        process$ = zip(commands$, results$).pipe(
          switchMap(([cmd, notifier$]) =>
            loading(cmd).pipe(
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
            loading(cmd).pipe(tap(notifier$))
          ),
          retry()
        );
        break;

      case CommandStrategy.Queue:
      default:
        process$ = zip(commands$, results$).pipe(
          concatMap(([cmd, notifier$]) =>
            loading(cmd).pipe(tap(notifier$))
          ),
          retry()
        );
        break;
    }

    this.subscriptions.add(process$.subscribe());

    const command: Command<P, R> = new (class extends Command {
      execute = (parameters: P) => {
        const result = new Subject<R>();
        results$.next(result);
        commands$.next(parameters);
        return result;
      };
    })();

    return command;
  }

  createFlow<P = undefined, R = unknown>(
    loading: (
      trigger: Observable<{ payload: P; notifier: Subject<R> }>
    ) => Observable<any>
  ): Command<P, R> {
    const commands$ = new Subject<P>();
    const notifiers$ = new Subject<Subject<R>>();

    const process$ = loading(
      zip(commands$, notifiers$).pipe(
        map(([payload, notifier]) => ({ payload, notifier }))
      )
    );

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
        notifiers$.next(result);
        commands$.next(parameters);
        return result;
      },
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
