import { OnDestroy } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import { AuthService, GlobalMessageService, WindowRef } from '@spartacus/core';
import { LoginFormComponentService } from '@spartacus/user/account/components';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CdcLoginFormComponentService extends LoginFormComponentService implements OnDestroy {
    protected auth: AuthService;
    protected globalMessageService: GlobalMessageService;
    protected winRef: WindowRef;
    protected cdcJsService: CdcJsService;
    constructor(auth: AuthService, globalMessageService: GlobalMessageService, winRef: WindowRef, cdcJsService: CdcJsService);
    protected subscription: Subscription;
    login(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcLoginFormComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcLoginFormComponentService>;
}
