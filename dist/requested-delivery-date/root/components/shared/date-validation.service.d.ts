import * as i0 from "@angular/core";
export declare class DateValidationService {
    /**
     * Validates if the string is containing a date string.
     * @param value Date string in the format 'dd-mm-yyy'
     * @returns true if valid, false if invalid
     */
    isDateStringValid(value: string | undefined): boolean;
    /**
     * Returns a Date object from a date string in the format 'dd-mm-yyy'
     * @param value Date string in the format 'dd-mm-yyy'
     */
    getDateFromDateString(value: string): Date;
    /**
     * Checks if the source date is greater than or equal to the target
     * @param source Date string in the format 'dd-mm-yyy'
     * @param target Date string in the format 'dd-mm-yyy'
     * @returns true if `source` date is greater than or equal to `target` date
     */
    isDateGreaterOrEqual(source: string, target: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateValidationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DateValidationService>;
}
