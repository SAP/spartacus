import { OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare abstract class Command<PARAMS = undefined, RESULT = unknown> {
    abstract execute(parameters: PARAMS): Observable<RESULT>;
}
export declare enum CommandStrategy {
    Parallel = 0,
    Queue = 1,
    CancelPrevious = 2,
    ErrorPrevious = 3
}
export declare class CommandService implements OnDestroy {
    protected subscriptions: Subscription;
    constructor();
    create<PARAMS = undefined, RESULT = unknown>(commandFactory: (command: PARAMS) => Observable<RESULT>, options?: {
        strategy?: CommandStrategy;
    }): Command<PARAMS, RESULT>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CommandService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CommandService>;
}
