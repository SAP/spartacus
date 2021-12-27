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
