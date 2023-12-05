/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class DateValidationService {
    /**
     * Validates if the string is containing a date string.
     * @param value Date string in the format 'dd-mm-yyy'
     * @returns true if valid, false if invalid
     */
    isDateStringValid(value) {
        return (value != null &&
            value !== undefined &&
            value.length > 0 &&
            !isNaN(this.getDateFromDateString(value).getDate() //convert 'dd-mm-yyyy' into 'mm/dd/yyyy'
            ));
    }
    /**
     * Returns a Date object from a date string in the format 'dd-mm-yyy'
     * @param value Date string in the format 'dd-mm-yyy'
     */
    getDateFromDateString(value) {
        return new Date(value.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'));
    }
    /**
     * Checks if the source date is greater than or equal to the target
     * @param source Date string in the format 'dd-mm-yyy'
     * @param target Date string in the format 'dd-mm-yyy'
     * @returns true if `source` date is greater than or equal to `target` date
     */
    isDateGreaterOrEqual(source, target) {
        if (source.length === 0 || target.length === 0) {
            return false;
        }
        const d1 = this.getDateFromDateString(source);
        const d2 = this.getDateFromDateString(target);
        return d1 < d2 ? false : true;
    }
}
DateValidationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DateValidationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DateValidationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DateValidationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DateValidationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS12YWxpZGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUvcm9vdC9jb21wb25lbnRzL3NoYXJlZC9kYXRlLXZhbGlkYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQzs7OztPQUlHO0lBQ0gsaUJBQWlCLENBQUMsS0FBeUI7UUFDekMsT0FBTyxDQUNMLEtBQUssSUFBSSxJQUFJO1lBQ2IsS0FBSyxLQUFLLFNBQVM7WUFDbkIsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ2hCLENBQUMsS0FBSyxDQUNKLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyx3Q0FBd0M7YUFDckYsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILHFCQUFxQixDQUFDLEtBQWE7UUFDakMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHlCQUF5QixFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsb0JBQW9CLENBQUMsTUFBYyxFQUFFLE1BQWM7UUFDakQsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM5QyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU5QyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2hDLENBQUM7O2tIQXZDVSxxQkFBcUI7c0hBQXJCLHFCQUFxQixjQUZwQixNQUFNOzJGQUVQLHFCQUFxQjtrQkFIakMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVmFsaWRhdGlvblNlcnZpY2Uge1xuICAvKipcbiAgICogVmFsaWRhdGVzIGlmIHRoZSBzdHJpbmcgaXMgY29udGFpbmluZyBhIGRhdGUgc3RyaW5nLlxuICAgKiBAcGFyYW0gdmFsdWUgRGF0ZSBzdHJpbmcgaW4gdGhlIGZvcm1hdCAnZGQtbW0teXl5J1xuICAgKiBAcmV0dXJucyB0cnVlIGlmIHZhbGlkLCBmYWxzZSBpZiBpbnZhbGlkXG4gICAqL1xuICBpc0RhdGVTdHJpbmdWYWxpZCh2YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHZhbHVlICE9IG51bGwgJiZcbiAgICAgIHZhbHVlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHZhbHVlLmxlbmd0aCA+IDAgJiZcbiAgICAgICFpc05hTihcbiAgICAgICAgdGhpcy5nZXREYXRlRnJvbURhdGVTdHJpbmcodmFsdWUpLmdldERhdGUoKSAvL2NvbnZlcnQgJ2RkLW1tLXl5eXknIGludG8gJ21tL2RkL3l5eXknXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgRGF0ZSBvYmplY3QgZnJvbSBhIGRhdGUgc3RyaW5nIGluIHRoZSBmb3JtYXQgJ2RkLW1tLXl5eSdcbiAgICogQHBhcmFtIHZhbHVlIERhdGUgc3RyaW5nIGluIHRoZSBmb3JtYXQgJ2RkLW1tLXl5eSdcbiAgICovXG4gIGdldERhdGVGcm9tRGF0ZVN0cmluZyh2YWx1ZTogc3RyaW5nKTogRGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlLnJlcGxhY2UoLyhcXGR7Mn0pLShcXGR7Mn0pLShcXGR7NH0pLywgJyQyLyQxLyQzJykpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgc291cmNlIGRhdGUgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSB0YXJnZXRcbiAgICogQHBhcmFtIHNvdXJjZSBEYXRlIHN0cmluZyBpbiB0aGUgZm9ybWF0ICdkZC1tbS15eXknXG4gICAqIEBwYXJhbSB0YXJnZXQgRGF0ZSBzdHJpbmcgaW4gdGhlIGZvcm1hdCAnZGQtbW0teXl5J1xuICAgKiBAcmV0dXJucyB0cnVlIGlmIGBzb3VyY2VgIGRhdGUgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIGB0YXJnZXRgIGRhdGVcbiAgICovXG4gIGlzRGF0ZUdyZWF0ZXJPckVxdWFsKHNvdXJjZTogc3RyaW5nLCB0YXJnZXQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmIChzb3VyY2UubGVuZ3RoID09PSAwIHx8IHRhcmdldC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZDEgPSB0aGlzLmdldERhdGVGcm9tRGF0ZVN0cmluZyhzb3VyY2UpO1xuICAgIGNvbnN0IGQyID0gdGhpcy5nZXREYXRlRnJvbURhdGVTdHJpbmcodGFyZ2V0KTtcblxuICAgIHJldHVybiBkMSA8IGQyID8gZmFsc2UgOiB0cnVlO1xuICB9XG59XG4iXX0=