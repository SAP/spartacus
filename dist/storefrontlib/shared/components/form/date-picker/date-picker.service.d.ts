import * as i0 from "@angular/core";
/**
 * Service that provides the placeholder and input pattern for date pickers. This is
 * used in Spartacus to support browser that won't support the native html5 date picker
 * using `<input type="date">`.
 *
 * While the placeholder is configurable, you should be aware that the placeholder format
 * defaults to `yyyy-mm-dd` to align with Safaris limited support of ISO 8601.
 * Another consideration is the support of date formats in the backend. In case you change
 * this format, you might need to serialize the date to the supported date format in the
 * backend.
 *
 */
export declare class DatePickerService {
    get placeholder(): string;
    /**
     * The default date pattern is based on the placeholder string;
     */
    get pattern(): string;
    /**
     * Validates if the string based date value is a valid date.
     */
    isValidFormat(date: string, pattern?: string): boolean;
    /**
     * Since Safari doesn't support proper date formats (ISO 8601), we need to do this
     * ourselves. We cannot rely on `new Date('2020-1-1')`. This will fail, only
     * `new Date('2020-01-01')` works.
     */
    getDate(value: string): Date | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatePickerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DatePickerService>;
}
