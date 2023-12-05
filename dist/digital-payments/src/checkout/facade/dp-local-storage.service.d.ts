import { Subscription } from 'rxjs';
import { DpPaymentRequest } from './../models/dp-checkout.model';
import { StatePersistenceService } from '@spartacus/core';
import { OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export declare class DpLocalStorageService implements OnDestroy {
    protected statePersistenceService: StatePersistenceService;
    constructor(statePersistenceService: StatePersistenceService);
    protected subscription: Subscription;
    syncCardRegistrationState(request: DpPaymentRequest): void;
    readCardRegistrationState(): DpPaymentRequest;
    protected clearDpStorage(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DpLocalStorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DpLocalStorageService>;
}
