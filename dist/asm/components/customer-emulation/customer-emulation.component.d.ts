import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FeatureModulesService, User } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AsmComponentService } from '../services/asm-component.service';
import * as i0 from "@angular/core";
export declare class CustomerEmulationComponent implements OnInit, OnDestroy {
    protected asmComponentService: AsmComponentService;
    protected userAccountFacade: UserAccountFacade;
    protected launchDialogService?: LaunchDialogService | undefined;
    protected featureModules?: FeatureModulesService | undefined;
    customer: User;
    isCustomerEmulationSessionInProgress$: Observable<boolean>;
    isAsmCustomer360Configured: boolean | undefined;
    isAsmCustomer360Loaded$: BehaviorSubject<boolean>;
    asmCustomer360LauncherElement: ElementRef;
    protected subscription: Subscription;
    constructor(asmComponentService: AsmComponentService, userAccountFacade: UserAccountFacade, launchDialogService: LaunchDialogService, featureModules: FeatureModulesService);
    /**
     * @deprecated since 7.0
     */
    constructor(asmComponentService: AsmComponentService, userAccountFacade: UserAccountFacade);
    ngOnInit(): void;
    logoutCustomer(): void;
    openAsmCustomer360(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomerEmulationComponent, [null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomerEmulationComponent, "cx-customer-emulation", never, {}, {}, never, never, false, never>;
}
