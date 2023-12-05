import { UntypedFormGroup } from '@angular/forms';
import { AuthService, GlobalMessageService, WindowRef } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class LoginFormComponentService {
    protected auth: AuthService;
    protected globalMessage: GlobalMessageService;
    protected winRef: WindowRef;
    constructor(auth: AuthService, globalMessage: GlobalMessageService, winRef: WindowRef);
    protected busy$: BehaviorSubject<boolean>;
    isUpdating$: import("rxjs").Observable<boolean>;
    form: UntypedFormGroup;
    login(): void;
    protected onSuccess(isLoggedIn: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoginFormComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LoginFormComponentService>;
}
