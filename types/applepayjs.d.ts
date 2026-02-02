/*
 * Stub type declarations for ApplePayJS to allow API Extractor to process
 * OPF quick-buy packages that reference Apple Pay types.
 */
declare namespace ApplePayJS {
  interface ApplePaySession {
    abort(): void;
    begin(): void;
    completeMerchantValidation(merchantSession: any): void;
    completePayment(result: any): void;
    completePaymentMethodSelection(update: any): void;
    completeShippingContactSelection(update: any): void;
    completeShippingMethodSelection(update: any): void;
    oncancel: ((event: any) => void) | null;
    onpaymentauthorized: ((event: any) => void) | null;
    onpaymentmethodselected: ((event: any) => void) | null;
    onshippingcontactselected: ((event: any) => void) | null;
    onshippingmethodselected: ((event: any) => void) | null;
    onvalidatemerchant: ((event: any) => void) | null;
  }
  
  interface ApplePayPaymentRequest {
    countryCode: string;
    currencyCode: string;
    merchantCapabilities: string[];
    supportedNetworks: string[];
    total: ApplePayLineItem;
    lineItems?: ApplePayLineItem[];
    shippingMethods?: ApplePayShippingMethod[];
    shippingType?: string;
    requiredBillingContactFields?: string[];
    requiredShippingContactFields?: string[];
    applicationData?: string;
  }
  
  interface ApplePayLineItem {
    label: string;
    amount: string;
    type?: string;
  }
  
  interface ApplePayShippingMethod {
    label: string;
    detail: string;
    amount: string;
    identifier: string;
  }
  
  interface ApplePayPayment {
    token: ApplePayPaymentToken;
    billingContact?: ApplePayPaymentContact;
    shippingContact?: ApplePayPaymentContact;
  }
  
  interface ApplePayPaymentToken {
    paymentData: any;
    paymentMethod: ApplePayPaymentMethod;
    transactionIdentifier: string;
  }
  
  interface ApplePayPaymentMethod {
    displayName: string;
    network: string;
    type: string;
    paymentPass?: any;
    billingContact?: ApplePayPaymentContact;
  }
  
  interface ApplePayPaymentContact {
    phoneNumber?: string;
    emailAddress?: string;
    givenName?: string;
    familyName?: string;
    phoneticGivenName?: string;
    phoneticFamilyName?: string;
    addressLines?: string[];
    subLocality?: string;
    locality?: string;
    postalCode?: string;
    subAdministrativeArea?: string;
    administrativeArea?: string;
    country?: string;
    countryCode?: string;
  }
  
  const STATUS_SUCCESS: number;
  const STATUS_FAILURE: number;
  const STATUS_INVALID_BILLING_POSTAL_ADDRESS: number;
  const STATUS_INVALID_SHIPPING_POSTAL_ADDRESS: number;
  const STATUS_INVALID_SHIPPING_CONTACT: number;
  const STATUS_PIN_INCORRECT: number;
  const STATUS_PIN_LOCKOUT: number;
  const STATUS_PIN_REQUIRED: number;
}

declare var ApplePaySession: {
  prototype: ApplePayJS.ApplePaySession;
  new (version: number, paymentRequest: ApplePayJS.ApplePayPaymentRequest): ApplePayJS.ApplePaySession;
  canMakePayments(): boolean;
  canMakePaymentsWithActiveCard(merchantIdentifier: string): Promise<boolean>;
  supportsVersion(version: number): boolean;
  readonly STATUS_SUCCESS: number;
  readonly STATUS_FAILURE: number;
};