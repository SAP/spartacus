export declare const enum CheckoutStepType {
    DELIVERY_ADDRESS = "deliveryAddress",
    DELIVERY_MODE = "deliveryMode",
    PAYMENT_DETAILS = "paymentDetails",
    REVIEW_ORDER = "reviewOrder"
}
export interface CheckoutStep {
    id: string;
    name: string;
    routeName: string;
    type: Array<CheckoutStepType>;
    disabled?: boolean;
    nameMultiLine?: boolean;
}
