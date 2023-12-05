import { PaymentDetails } from '@spartacus/cart/base/root';
import { TranslationService } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Card } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import * as i0 from "@angular/core";
export declare class OrderDetailBillingComponent {
    protected orderDetailsService: OrderDetailsService;
    protected translationService: TranslationService;
    order$: Observable<Order | undefined>;
    constructor(orderDetailsService: OrderDetailsService, translationService: TranslationService);
    getPaymentMethodCard(paymentDetails: PaymentDetails): Observable<Card>;
    getBillingAddressCard(paymentDetails: PaymentDetails): Observable<Card>;
    isPaymentInfoCardFull(payment: PaymentDetails): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderDetailBillingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderDetailBillingComponent, "cx-order-detail-billing", never, {}, {}, never, never, false, never>;
}
