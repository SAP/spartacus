export declare const recurrencePeriod: {
    DAILY: string;
    WEEKLY: string;
    MONTHLY: string;
};
export declare enum DaysOfWeek {
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}
export interface ScheduleReplenishmentForm {
    daysOfWeek?: DaysOfWeek[];
    nthDayOfMonth?: string;
    numberOfDays?: string;
    numberOfWeeks?: string;
    recurrencePeriod?: string;
    replenishmentStartDate?: string;
}
export declare enum ORDER_TYPE {
    PLACE_ORDER = "PLACE_ORDER",
    SCHEDULE_REPLENISHMENT_ORDER = "SCHEDULE_REPLENISHMENT_ORDER"
}
