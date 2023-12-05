/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { EMPTY, ReplaySubject, Subject, Subscription, defer, zip, } from 'rxjs';
import { catchError, concatMap, finalize, mergeMap, switchMap, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class Command {
}
export var CommandStrategy;
(function (CommandStrategy) {
    CommandStrategy[CommandStrategy["Parallel"] = 0] = "Parallel";
    CommandStrategy[CommandStrategy["Queue"] = 1] = "Queue";
    CommandStrategy[CommandStrategy["CancelPrevious"] = 2] = "CancelPrevious";
    CommandStrategy[CommandStrategy["ErrorPrevious"] = 3] = "ErrorPrevious";
    // SkipIfOngoing,
    // ErrorIfOngoing
})(CommandStrategy || (CommandStrategy = {}));
export class CommandService {
    constructor() {
        this.subscriptions = new Subscription();
        // Intentional empty constructor
    }
    create(commandFactory, options) {
        const commands$ = new Subject();
        const results$ = new Subject();
        let process$;
        switch (options?.strategy) {
            case CommandStrategy.CancelPrevious:
            case CommandStrategy.ErrorPrevious:
                process$ = zip(commands$, results$).pipe(switchMap(([cmd, notifier$]) => defer(() => commandFactory(cmd)).pipe(tap(notifier$), catchError(() => EMPTY), finalize(() => {
                    // do not overwrite existing existing ending state
                    if (!notifier$.closed && !notifier$.hasError) {
                        // command has not ended yet, so close notifier$ according to strategy
                        if (options.strategy === CommandStrategy.ErrorPrevious) {
                            notifier$.error(new Error('Canceled by next command'));
                        }
                        else {
                            notifier$.complete();
                        }
                    }
                }))));
                break;
            case CommandStrategy.Parallel:
                process$ = zip(commands$, results$).pipe(mergeMap(([cmd, notifier$]) => defer(() => commandFactory(cmd)).pipe(tap(notifier$), catchError(() => EMPTY))));
                break;
            case CommandStrategy.Queue:
            default:
                process$ = zip(commands$, results$).pipe(concatMap(([cmd, notifier$]) => defer(() => commandFactory(cmd)).pipe(tap(notifier$), catchError(() => EMPTY))));
                break;
        }
        this.subscriptions.add(process$.subscribe());
        const command = new (class extends Command {
            constructor() {
                super(...arguments);
                this.execute = (parameters) => {
                    const result$ = new ReplaySubject();
                    results$.next(result$);
                    commands$.next(parameters);
                    return result$;
                };
            }
        })();
        return command;
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CommandService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommandService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CommandService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommandService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommandService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvdXRpbC9jb21tYW5kLXF1ZXJ5L2NvbW1hbmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQ0wsS0FBSyxFQUVMLGFBQWEsRUFDYixPQUFPLEVBQ1AsWUFBWSxFQUNaLEtBQUssRUFDTCxHQUFHLEdBQ0osTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQ0wsVUFBVSxFQUNWLFNBQVMsRUFDVCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFNBQVMsRUFDVCxHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFeEIsTUFBTSxPQUFnQixPQUFPO0NBRTVCO0FBRUQsTUFBTSxDQUFOLElBQVksZUFPWDtBQVBELFdBQVksZUFBZTtJQUN6Qiw2REFBUSxDQUFBO0lBQ1IsdURBQUssQ0FBQTtJQUNMLHlFQUFjLENBQUE7SUFDZCx1RUFBYSxDQUFBO0lBQ2IsaUJBQWlCO0lBQ2pCLGlCQUFpQjtBQUNuQixDQUFDLEVBUFcsZUFBZSxLQUFmLGVBQWUsUUFPMUI7QUFLRCxNQUFNLE9BQU8sY0FBYztJQUd6QjtRQUZVLGtCQUFhLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHekQsZ0NBQWdDO0lBQ2xDLENBQUM7SUFFRCxNQUFNLENBQ0osY0FBdUQsRUFDdkQsT0FBd0M7UUFFeEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUN4QyxNQUFNLFFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBeUIsQ0FBQztRQUV0RCxJQUFJLFFBQTZCLENBQUM7UUFFbEMsUUFBUSxPQUFPLEVBQUUsUUFBUSxFQUFFO1lBQ3pCLEtBQUssZUFBZSxDQUFDLGNBQWMsQ0FBQztZQUNwQyxLQUFLLGVB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MDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRU1QVFksXG4gIE9ic2VydmFibGUsXG4gIFJlcGxheVN1YmplY3QsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmlwdGlvbixcbiAgZGVmZXIsXG4gIHppcCxcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBjYXRjaEVycm9yLFxuICBjb25jYXRNYXAsXG4gIGZpbmFsaXplLFxuICBtZXJnZU1hcCxcbiAgc3dpdGNoTWFwLFxuICB0YXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbW1hbmQ8UEFSQU1TID0gdW5kZWZpbmVkLCBSRVNVTFQgPSB1bmtub3duPiB7XG4gIGFic3RyYWN0IGV4ZWN1dGUocGFyYW1ldGVyczogUEFSQU1TKTogT2JzZXJ2YWJsZTxSRVNVTFQ+O1xufVxuXG5leHBvcnQgZW51bSBDb21tYW5kU3RyYXRlZ3kge1xuICBQYXJhbGxlbCxcbiAgUXVldWUsXG4gIENhbmNlbFByZXZpb3VzLFxuICBFcnJvclByZXZpb3VzLFxuICAvLyBTa2lwSWZPbmdvaW5nLFxuICAvLyBFcnJvcklmT25nb2luZ1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29tbWFuZFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIEludGVudGlvbmFsIGVtcHR5IGNvbnN0cnVjdG9yXG4gIH1cblxuICBjcmVhdGU8UEFSQU1TID0gdW5kZWZpbmVkLCBSRVNVTFQgPSB1bmtub3duPihcbiAgICBjb21tYW5kRmFjdG9yeTogKGNvbW1hbmQ6IFBBUkFNUykgPT4gT2JzZXJ2YWJsZTxSRVNVTFQ+LFxuICAgIG9wdGlvbnM/OiB7IHN0cmF0ZWd5PzogQ29tbWFuZFN0cmF0ZWd5IH1cbiAgKTogQ29tbWFuZDxQQVJBTVMsIFJFU1VMVD4ge1xuICAgIGNvbnN0IGNvbW1hbmRzJCA9IG5ldyBTdWJqZWN0PFBBUkFNUz4oKTtcbiAgICBjb25zdCByZXN1bHRzJCA9IG5ldyBTdWJqZWN0PFJlcGxheVN1YmplY3Q8UkVTVUxUPj4oKTtcblxuICAgIGxldCBwcm9jZXNzJDogT2JzZXJ2YWJsZTx1bmtub3duPjtcblxuICAgIHN3aXRjaCAob3B0aW9ucz8uc3RyYXRlZ3kpIHtcbiAgICAgIGNhc2UgQ29tbWFuZFN0cmF0ZWd5LkNhbmNlbFByZXZpb3VzOlxuICAgICAgY2FzZSBDb21tYW5kU3RyYXRlZ3kuRXJyb3JQcmV2aW91czpcbiAgICAgICAgcHJvY2VzcyQgPSB6aXAoY29tbWFuZHMkLCByZXN1bHRzJCkucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKFtjbWQsIG5vdGlmaWVyJF0pID0+XG4gICAgICAgICAgICBkZWZlcigoKSA9PiBjb21tYW5kRmFjdG9yeShjbWQpKS5waXBlKFxuICAgICAgICAgICAgICB0YXAobm90aWZpZXIkKSxcbiAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiBFTVBUWSksXG4gICAgICAgICAgICAgIGZpbmFsaXplKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBkbyBub3Qgb3ZlcndyaXRlIGV4aXN0aW5nIGV4aXN0aW5nIGVuZGluZyBzdGF0ZVxuICAgICAgICAgICAgICAgIGlmICghbm90aWZpZXIkLmNsb3NlZCAmJiAhbm90aWZpZXIkLmhhc0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgICAvLyBjb21tYW5kIGhhcyBub3QgZW5kZWQgeWV0LCBzbyBjbG9zZSBub3RpZmllciQgYWNjb3JkaW5nIHRvIHN0cmF0ZWd5XG4gICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zdHJhdGVneSA9PT0gQ29tbWFuZFN0cmF0ZWd5LkVycm9yUHJldmlvdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpZXIkLmVycm9yKG5ldyBFcnJvcignQ2FuY2VsZWQgYnkgbmV4dCBjb21tYW5kJykpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpZXIkLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgQ29tbWFuZFN0cmF0ZWd5LlBhcmFsbGVsOlxuICAgICAgICBwcm9jZXNzJCA9IHppcChjb21tYW5kcyQsIHJlc3VsdHMkKS5waXBlKFxuICAgICAgICAgIG1lcmdlTWFwKChbY21kLCBub3RpZmllciRdKSA9PlxuICAgICAgICAgICAgZGVmZXIoKCkgPT4gY29tbWFuZEZhY3RvcnkoY21kKSkucGlwZShcbiAgICAgICAgICAgICAgdGFwKG5vdGlmaWVyJCksXG4gICAgICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4gRU1QVFkpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBDb21tYW5kU3RyYXRlZ3kuUXVldWU6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBwcm9jZXNzJCA9IHppcChjb21tYW5kcyQsIHJlc3VsdHMkKS5waXBlKFxuICAgICAgICAgIGNvbmNhdE1hcCgoW2NtZCwgbm90aWZpZXIkXSkgPT5cbiAgICAgICAgICAgIGRlZmVyKCgpID0+IGNvbW1hbmRGYWN0b3J5KGNtZCkpLnBpcGUoXG4gICAgICAgICAgICAgIHRhcChub3RpZmllciQpLFxuICAgICAgICAgICAgICBjYXRjaEVycm9yKCgpID0+IEVNUFRZKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChwcm9jZXNzJC5zdWJzY3JpYmUoKSk7XG5cbiAgICBjb25zdCBjb21tYW5kOiBDb21tYW5kPFBBUkFNUywgUkVTVUxUPiA9IG5ldyAoY2xhc3MgZXh0ZW5kcyBDb21tYW5kPFxuICAgICAgUEFSQU1TLFxuICAgICAgUkVTVUxUXG4gICAgPiB7XG4gICAgICBleGVjdXRlID0gKHBhcmFtZXRlcnM6IFBBUkFNUykgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQkID0gbmV3IFJlcGxheVN1YmplY3Q8UkVTVUxUPigpO1xuICAgICAgICByZXN1bHRzJC5uZXh0KHJlc3VsdCQpO1xuICAgICAgICBjb21tYW5kcyQubmV4dChwYXJhbWV0ZXJzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCQ7XG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICByZXR1cm4gY29tbWFuZDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=