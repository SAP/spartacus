import { DpLocalStorageService } from './../../../facade/dp-local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalMessageService } from '@spartacus/core';
import { DpCheckoutPaymentService } from '../../../facade';
import { OnInit, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class DpPaymentCallbackComponent implements OnInit {
    protected dpPaymentService: DpCheckoutPaymentService;
    protected dpStorageService: DpLocalStorageService;
    protected globalMsgService: GlobalMessageService;
    protected route: ActivatedRoute;
    closeCallback: EventEmitter<any>;
    paymentDetailsAdded: EventEmitter<any>;
    constructor(dpPaymentService: DpCheckoutPaymentService, dpStorageService: DpLocalStorageService, globalMsgService: GlobalMessageService, route: ActivatedRoute);
    ngOnInit(): void;
    private fetchPaymentDetails;
    static ɵfac: i0.ɵɵFactoryDeclaration<DpPaymentCallbackComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DpPaymentCallbackComponent, "cx-dp-payment-callback", never, {}, { "closeCallback": "closeCallback"; "paymentDetailsAdded": "paymentDetailsAdded"; }, never, never, false, never>;
}
