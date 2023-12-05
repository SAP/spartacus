/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
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
export class DatePickerService {
    get placeholder() {
        return 'yyyy-mm-dd';
    }
    /**
     * The default date pattern is based on the placeholder string;
     */
    get pattern() {
        return this.placeholder
            .replace('yyyy', '\\d{4}')
            .replace('mm', '\\d{1,2}')
            .replace('dd', '\\d{1,2}');
    }
    /**
     * Validates if the string based date value is a valid date.
     */
    isValidFormat(date, pattern) {
        const patternRegex = new RegExp(`^${pattern ?? this.pattern}$`);
        return patternRegex.test(date);
    }
    /**
     * Since Safari doesn't support proper date formats (ISO 8601), we need to do this
     * ourselves. We cannot rely on `new Date('2020-1-1')`. This will fail, only
     * `new Date('2020-01-01')` works.
     */
    getDate(value) {
        if (!value) {
            return;
        }
        const delimiter = this.placeholder
            .replace('yyyy', '')
            .replace('mm', '')
            .replace('dd', '')
            .substring(0, 1);
        const dateParts = value.split(delimiter);
        const placeholderParts = this.placeholder.split(delimiter);
        const y = placeholderParts.indexOf('yyyy');
        const m = placeholderParts.indexOf('mm');
        const d = placeholderParts.indexOf('dd');
        return new Date(Number(dateParts[y]), Number(dateParts[m]) - 1, Number(dateParts[d]));
    }
}
DatePickerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DatePickerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DatePickerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DatePickerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DatePickerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvZm9ybS9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQzs7Ozs7Ozs7Ozs7R0FXRztBQUlILE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsSUFBSSxXQUFXO1FBQ2IsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsV0FBVzthQUNwQixPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQzthQUN6QixPQUFPLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQzthQUN6QixPQUFPLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7T0FFRztJQUNILGFBQWEsQ0FBQyxJQUFZLEVBQUUsT0FBZ0I7UUFDMUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDaEUsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsT0FBTyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU87U0FDUjtRQUVELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXO2FBQy9CLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO2FBQ2pCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO2FBQ2pCLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbkIsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV6QyxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTNELE1BQU0sQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpDLE9BQU8sSUFBSSxJQUFJLENBQ2IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNwQixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUN4QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3JCLENBQUM7SUFDSixDQUFDOzs4R0FwRFUsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FGaEIsTUFBTTsyRkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFNlcnZpY2UgdGhhdCBwcm92aWRlcyB0aGUgcGxhY2Vob2xkZXIgYW5kIGlucHV0IHBhdHRlcm4gZm9yIGRhdGUgcGlja2Vycy4gVGhpcyBpc1xuICogdXNlZCBpbiBTcGFydGFjdXMgdG8gc3VwcG9ydCBicm93c2VyIHRoYXQgd29uJ3Qgc3VwcG9ydCB0aGUgbmF0aXZlIGh0bWw1IGRhdGUgcGlja2VyXG4gKiB1c2luZyBgPGlucHV0IHR5cGU9XCJkYXRlXCI+YC5cbiAqXG4gKiBXaGlsZSB0aGUgcGxhY2Vob2xkZXIgaXMgY29uZmlndXJhYmxlLCB5b3Ugc2hvdWxkIGJlIGF3YXJlIHRoYXQgdGhlIHBsYWNlaG9sZGVyIGZvcm1hdFxuICogZGVmYXVsdHMgdG8gYHl5eXktbW0tZGRgIHRvIGFsaWduIHdpdGggU2FmYXJpcyBsaW1pdGVkIHN1cHBvcnQgb2YgSVNPIDg2MDEuXG4gKiBBbm90aGVyIGNvbnNpZGVyYXRpb24gaXMgdGhlIHN1cHBvcnQgb2YgZGF0ZSBmb3JtYXRzIGluIHRoZSBiYWNrZW5kLiBJbiBjYXNlIHlvdSBjaGFuZ2VcbiAqIHRoaXMgZm9ybWF0LCB5b3UgbWlnaHQgbmVlZCB0byBzZXJpYWxpemUgdGhlIGRhdGUgdG8gdGhlIHN1cHBvcnRlZCBkYXRlIGZvcm1hdCBpbiB0aGVcbiAqIGJhY2tlbmQuXG4gKlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVBpY2tlclNlcnZpY2Uge1xuICBnZXQgcGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ3l5eXktbW0tZGQnO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGRhdGUgcGF0dGVybiBpcyBiYXNlZCBvbiB0aGUgcGxhY2Vob2xkZXIgc3RyaW5nO1xuICAgKi9cbiAgZ2V0IHBhdHRlcm4oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wbGFjZWhvbGRlclxuICAgICAgLnJlcGxhY2UoJ3l5eXknLCAnXFxcXGR7NH0nKVxuICAgICAgLnJlcGxhY2UoJ21tJywgJ1xcXFxkezEsMn0nKVxuICAgICAgLnJlcGxhY2UoJ2RkJywgJ1xcXFxkezEsMn0nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZXMgaWYgdGhlIHN0cmluZyBiYXNlZCBkYXRlIHZhbHVlIGlzIGEgdmFsaWQgZGF0ZS5cbiAgICovXG4gIGlzVmFsaWRGb3JtYXQoZGF0ZTogc3RyaW5nLCBwYXR0ZXJuPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcGF0dGVyblJlZ2V4ID0gbmV3IFJlZ0V4cChgXiR7cGF0dGVybiA/PyB0aGlzLnBhdHRlcm59JGApO1xuICAgIHJldHVybiBwYXR0ZXJuUmVnZXgudGVzdChkYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaW5jZSBTYWZhcmkgZG9lc24ndCBzdXBwb3J0IHByb3BlciBkYXRlIGZvcm1hdHMgKElTTyA4NjAxKSwgd2UgbmVlZCB0byBkbyB0aGlzXG4gICAqIG91cnNlbHZlcy4gV2UgY2Fubm90IHJlbHkgb24gYG5ldyBEYXRlKCcyMDIwLTEtMScpYC4gVGhpcyB3aWxsIGZhaWwsIG9ubHlcbiAgICogYG5ldyBEYXRlKCcyMDIwLTAxLTAxJylgIHdvcmtzLlxuICAgKi9cbiAgZ2V0RGF0ZSh2YWx1ZTogc3RyaW5nKTogRGF0ZSB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRlbGltaXRlciA9IHRoaXMucGxhY2Vob2xkZXJcbiAgICAgIC5yZXBsYWNlKCd5eXl5JywgJycpXG4gICAgICAucmVwbGFjZSgnbW0nLCAnJylcbiAgICAgIC5yZXBsYWNlKCdkZCcsICcnKVxuICAgICAgLnN1YnN0cmluZygwLCAxKTtcblxuICAgIGNvbnN0IGRhdGVQYXJ0cyA9IHZhbHVlLnNwbGl0KGRlbGltaXRlcik7XG5cbiAgICBjb25zdCBwbGFjZWhvbGRlclBhcnRzID0gdGhpcy5wbGFjZWhvbGRlci5zcGxpdChkZWxpbWl0ZXIpO1xuXG4gICAgY29uc3QgeSA9IHBsYWNlaG9sZGVyUGFydHMuaW5kZXhPZigneXl5eScpO1xuICAgIGNvbnN0IG0gPSBwbGFjZWhvbGRlclBhcnRzLmluZGV4T2YoJ21tJyk7XG4gICAgY29uc3QgZCA9IHBsYWNlaG9sZGVyUGFydHMuaW5kZXhPZignZGQnKTtcblxuICAgIHJldHVybiBuZXcgRGF0ZShcbiAgICAgIE51bWJlcihkYXRlUGFydHNbeV0pLFxuICAgICAgTnVtYmVyKGRhdGVQYXJ0c1ttXSkgLSAxLFxuICAgICAgTnVtYmVyKGRhdGVQYXJ0c1tkXSlcbiAgICApO1xuICB9XG59XG4iXX0=