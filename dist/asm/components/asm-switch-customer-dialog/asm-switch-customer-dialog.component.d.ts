import { OnInit } from '@angular/core';
import { User } from '@spartacus/core';
import { FocusConfig, LaunchDialogService } from '@spartacus/storefront';
import { AsmComponentService } from '../services';
import * as i0 from "@angular/core";
export declare enum SWITCH_CUSTOMER_DIALOG_ACTION {
    CANCEL = "CANCEL",
    SWITCH = "SWITCH"
}
export interface SwitchCustomerData {
    curCustomer: User;
    switchCustomer: User;
}
export declare class AsmSwitchCustomerDialogComponent implements OnInit {
    protected launchDialogService: LaunchDialogService;
    protected asmComponentService: AsmComponentService;
    SWITCH_CUSTOMER_DIALOG_ACTION: typeof SWITCH_CUSTOMER_DIALOG_ACTION;
    focusConfig: FocusConfig;
    curCustomerName: string;
    switchCustomerName: string;
    iconTypes: any;
    constructor(launchDialogService: LaunchDialogService, asmComponentService: AsmComponentService);
    ngOnInit(): void;
    closeModal(reason: SWITCH_CUSTOMER_DIALOG_ACTION): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmSwitchCustomerDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmSwitchCustomerDialogComponent, "cx-asm-switch-customer-dialog", never, {}, {}, never, never, false, never>;
}
