import { DpLocalStorageService } from '../../../facade/dp-local-storage.service';
import { GlobalMessageService, WindowRef } from '@spartacus/core';
import { DpCheckoutPaymentService } from '../../../facade';
import { OnInit, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class DpPaymentFormComponent implements OnInit {
    private dpPaymentService;
    private dpStorageService;
    private globalMsgService;
    private winRef;
    closeForm: EventEmitter<any>;
    constructor(dpPaymentService: DpCheckoutPaymentService, dpStorageService: DpLocalStorageService, globalMsgService: GlobalMessageService, winRef: WindowRef);
    ngOnInit(): void;
    redirect(url: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DpPaymentFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DpPaymentFormComponent, "cx-dp-payment-form", never, {}, { "closeForm": "closeForm"; }, never, never, false, never>;
}
