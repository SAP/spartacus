export enum CheckoutStepType {
  SHIPPING_ADDRESS = 'shippingAddress',
  DELIVERY_MODE = 'deliveryMode',
  PAYMENT_DETAILS = 'paymentDetails',
  REVIEW_ORDER = 'reviewOrder',
  PAYMENT_TYPE = 'paymentType',
}

export const checkoutShippingSteps = [
  CheckoutStepType.SHIPPING_ADDRESS,
  CheckoutStepType.DELIVERY_MODE,
];

export const checkoutPaymentSteps = [
  CheckoutStepType.PAYMENT_DETAILS,
  CheckoutStepType.PAYMENT_TYPE,
  CheckoutStepType.SHIPPING_ADDRESS,
];

export interface CheckoutStep {
  id: string;
  name: string;
  routeName: string;
  type: Array<CheckoutStepType>;
  disabled?: boolean;
}

export enum B2BPaymentTypeEnum {
  ACCOUNT_PAYMENT = 'ACCOUNT',
  CARD_PAYMENT = 'CARD',
}

export interface ScheduleReplenishmentForm {
  daysOfWeek?: DaysOfWeek[];
  nthDayOfMonth?: string;
  numberOfDays?: string;
  numberOfWeeks?: string;
  recurrencePeriod?: string;
  replenishmentStartDate?: string;
}

export enum DaysOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export const recurrencePeriod = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
};

export enum ORDER_TYPE {
  PLACE_ORDER = 'PLACE_ORDER',
  SCHEDULE_REPLENISHMENT_ORDER = 'SCHEDULE_REPLENISHMENT_ORDER',
}
