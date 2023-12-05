import { OnInit } from '@angular/core';
import { GlobalMessageService, PaymentDetails, TranslationService, UserPaymentService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../../../cms-components/misc/icon';
import { Card } from '../../../shared/components/card/card.component';
import * as i0 from "@angular/core";
export declare class PaymentMethodsComponent implements OnInit {
    private userPaymentService;
    private translation;
    protected globalMessageService?: GlobalMessageService | undefined;
    paymentMethods$: Observable<PaymentDetails[]>;
    editCard: string | undefined;
    iconTypes: typeof ICON_TYPE;
    loading$: Observable<boolean>;
    constructor(userPaymentService: UserPaymentService, translation: TranslationService, globalMessageService?: GlobalMessageService | undefined);
    ngOnInit(): void;
    getCardContent({ defaultPayment, accountHolderName, expiryMonth, expiryYear, cardNumber, cardType, }: PaymentDetails): Observable<Card>;
    deletePaymentMethod(paymentMethod: PaymentDetails): void;
    setEdit(paymentMethod: PaymentDetails): void;
    cancelCard(): void;
    setDefaultPaymentMethod(paymentMethod: PaymentDetails): void;
    getCardIcon(code: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaymentMethodsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PaymentMethodsComponent, "cx-payment-methods", never, {}, {}, never, never, false, never>;
}
