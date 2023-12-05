import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { AsmConfig } from '@spartacus/asm/root';
import { RoutingService, UserIdService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { AsmComponentService } from '../services/asm-component.service';
import * as i0 from "@angular/core";
export declare class AsmSessionTimerComponent implements OnInit, OnDestroy {
    protected config: AsmConfig;
    protected asmComponentService: AsmComponentService;
    protected routingService: RoutingService;
    protected changeDetectorRef: ChangeDetectorRef;
    protected userIdService: UserIdService;
    protected subscriptions: Subscription;
    protected interval: any;
    protected maxStartDelayInSeconds: number;
    timeLeft: number;
    expiredTime: number;
    constructor(config: AsmConfig, asmComponentService: AsmComponentService, routingService: RoutingService, changeDetectorRef: ChangeDetectorRef, userIdService: UserIdService);
    ngOnInit(): void;
    protected resetOnNavigate(): void;
    protected resetOnCustomerSessionChange(): void;
    protected initTimer(): void;
    resetTimer(): void;
    protected getTimerStartDelayInSeconds(): number;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmSessionTimerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmSessionTimerComponent, "cx-asm-session-timer", never, {}, {}, never, never, false, never>;
}
