import { EventEmitter } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { PromotionListEntry } from './asm-customer-360-promotion-listing.model';
import * as i0 from "@angular/core";
export declare class AsmCustomer360PromotionListingComponent {
    headerText: string;
    emptyStateText: string;
    applyButtonText: string;
    applied: string;
    removeButtonText: string;
    entries: Array<PromotionListEntry> | null;
    showAlert: boolean | null;
    showAlertForApplyAction: boolean | null;
    showRemoveButton: boolean;
    showApplyButton: boolean;
    isCustomerCoupon: boolean;
    apply: EventEmitter<PromotionListEntry>;
    remove: EventEmitter<PromotionListEntry>;
    removeAlert: EventEmitter<any>;
    removeAlertForApplyAction: EventEmitter<any>;
    globalMessageType: typeof GlobalMessageType;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360PromotionListingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmCustomer360PromotionListingComponent, "cx-asm-customer-360-promotion-listing", never, { "headerText": "headerText"; "emptyStateText": "emptyStateText"; "applyButtonText": "applyButtonText"; "applied": "applied"; "removeButtonText": "removeButtonText"; "entries": "entries"; "showAlert": "showAlert"; "showAlertForApplyAction": "showAlertForApplyAction"; "showRemoveButton": "showRemoveButton"; "showApplyButton": "showApplyButton"; "isCustomerCoupon": "isCustomerCoupon"; }, { "apply": "apply"; "remove": "remove"; "removeAlert": "removeAlert"; "removeAlertForApplyAction": "removeAlertForApplyAction"; }, never, ["*"], false, never>;
}
