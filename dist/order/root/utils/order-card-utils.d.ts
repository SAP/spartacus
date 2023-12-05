import { DeliveryMode, PaymentDetails } from '@spartacus/cart/base/root';
import { Address } from '@spartacus/core';
import { Card } from '@spartacus/storefront';
/**
 * Get card for delivery address
 */
export declare function deliveryAddressCard(textTitle: string, textPhone: string, textMobile: string, deliveryAddress: Address, countryName?: string): Card;
/**
 * Get card for delivery mode
 */
export declare function deliveryModeCard(textTitle: string, deliveryMode: DeliveryMode): Card;
/**
 * Get card for payment method
 */
export declare function paymentMethodCard(textTitle: string, textExpires: string, paymentDetails: PaymentDetails): Card;
/**
 * Get card for billing address
 */
export declare function billingAddressCard(textTitle: string, textBillTo: string, paymentDetails: PaymentDetails): Card;
