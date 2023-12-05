/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class FilesFormValidators {
    constructor() {
        this.CONVERT_TO_MB = 1000000;
        this.extenstionRegEx = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    }
    /**
     * Checks max size of file
     *
     * @param {number} maxSize Max size [MB]
     * @returns Uses 'tooLarge' validator error with maxSize property
     * @memberOf FilesFormValidators
     */
    maxSize(maxSize) {
        return (control) => {
            const errors = {};
            if (maxSize && control.value) {
                const files = Array.from(control.value);
                files.forEach(({ size, name }) => {
                    if (size > maxSize * this.CONVERT_TO_MB) {
                        const invalidFiles = errors.tooLarge?.invalidFiles ?? [];
                        errors.tooLarge = {
                            maxSize,
                            invalidFiles: [...invalidFiles, name],
                        };
                    }
                });
            }
            return Object.keys(errors).length === 0 ? null : errors;
        };
    }
    /**
     * Checks maximum entries
     *
     * @param {number} maxEntries Max number of entries
     * @returns Uses 'tooManyEntries' validator error with maxEntries property
     * @memberOf FilesFormValidators
     */
    maxEntries(maxEntries) {
        return (control) => {
            const errors = {};
            if (maxEntries && control.value) {
                const files = Array.from(control.value);
                if (files.length > maxEntries) {
                    errors.tooManyEntries = { maxEntries };
                }
            }
            return Object.keys(errors).length === 0 ? null : errors;
        };
    }
    /**
     * Checks allowed types
     *
     * @param {Array<string>} allowedTypes Allowed types of files
     * @returns Uses 'notParsable' validator error with allowedTypes property
     * @memberOf FilesFormValidators
     */
    allowedTypes(allowedTypes) {
        return (control) => {
            const errors = {};
            if (allowedTypes && control.value) {
                const files = Array.from(control.value);
                errors.fileNotAllowed = files.some(({ name }) => !allowedTypes.includes(this.getExtension(name)));
            }
            return errors[Object.keys(errors)?.[0]] ? errors : null;
        };
    }
    getExtension(filename) {
        return (filename?.match(this.extenstionRegEx) || [])[0] || '';
    }
}
FilesFormValidators.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FilesFormValidators, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FilesFormValidators.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FilesFormValidators, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FilesFormValidators, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMtZm9ybS12YWxpZGF0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvc2VydmljZXMvZmlsZS9maWxlcy1mb3JtLXZhbGlkYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDLE1BQU0sT0FBTyxtQkFBbUI7SUFIaEM7UUFJRSxrQkFBYSxHQUFHLE9BQU8sQ0FBQztRQUN4QixvQkFBZSxHQUFXLDJCQUEyQixDQUFDO0tBdUV2RDtJQXJFQzs7Ozs7O09BTUc7SUFDSCxPQUFPLENBQUMsT0FBZ0I7UUFDdEIsT0FBTyxDQUFDLE9BQXdCLEVBQTJCLEVBQUU7WUFDM0QsTUFBTSxNQUFNLEdBQXFCLEVBQUUsQ0FBQztZQUNwQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUM1QixNQUFNLEtBQUssR0FBVyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7b0JBQy9CLElBQUksSUFBSSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFO3dCQUN2QyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLFlBQVksSUFBSSxFQUFFLENBQUM7d0JBQ3pELE1BQU0sQ0FBQyxRQUFRLEdBQUc7NEJBQ2hCLE9BQU87NEJBQ1AsWUFBWSxFQUFFLENBQUMsR0FBRyxZQUFZLEVBQUUsSUFBSSxDQUFDO3lCQUN0QyxDQUFDO3FCQUNIO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDMUQsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFVBQVUsQ0FBQyxVQUFtQjtRQUM1QixPQUFPLENBQUMsT0FBd0IsRUFBMkIsRUFBRTtZQUMzRCxNQUFNLE1BQU0sR0FBcUIsRUFBRSxDQUFDO1lBQ3BDLElBQUksVUFBVSxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBQy9CLE1BQU0sS0FBSyxHQUFXLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsVUFBVSxFQUFFO29CQUM3QixNQUFNLENBQUMsY0FBYyxHQUFHLEVBQUUsVUFBVSxFQUFFLENBQUM7aUJBQ3hDO2FBQ0Y7WUFDRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDMUQsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFlBQVksQ0FBQyxZQUE0QjtRQUN2QyxPQUFPLENBQUMsT0FBd0IsRUFBMkIsRUFBRTtZQUMzRCxNQUFNLE1BQU0sR0FBcUIsRUFBRSxDQUFDO1lBQ3BDLElBQUksWUFBWSxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2pDLE1BQU0sS0FBSyxHQUFXLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ2hDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDOUQsQ0FBQzthQUNIO1lBQ0QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzFELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFUyxZQUFZLENBQUMsUUFBaUI7UUFDdEMsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoRSxDQUFDOztnSEF4RVUsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FGbEIsTUFBTTsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBWYWxpZGF0aW9uRXJyb3JzLCBWYWxpZGF0b3JGbiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVzRm9ybVZhbGlkYXRvcnMge1xuICBDT05WRVJUX1RPX01CID0gMTAwMDAwMDtcbiAgZXh0ZW5zdGlvblJlZ0V4OiBSZWdFeHAgPSAvXFwuKFswLTlhLXpdKykoPzpbXFw/I118JCkvaTtcblxuICAvKipcbiAgICogQ2hlY2tzIG1heCBzaXplIG9mIGZpbGVcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1heFNpemUgTWF4IHNpemUgW01CXVxuICAgKiBAcmV0dXJucyBVc2VzICd0b29MYXJnZScgdmFsaWRhdG9yIGVycm9yIHdpdGggbWF4U2l6ZSBwcm9wZXJ0eVxuICAgKiBAbWVtYmVyT2YgRmlsZXNGb3JtVmFsaWRhdG9yc1xuICAgKi9cbiAgbWF4U2l6ZShtYXhTaXplPzogbnVtYmVyKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xuICAgICAgY29uc3QgZXJyb3JzOiBWYWxpZGF0aW9uRXJyb3JzID0ge307XG4gICAgICBpZiAobWF4U2l6ZSAmJiBjb250cm9sLnZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGZpbGVzOiBGaWxlW10gPSBBcnJheS5mcm9tKGNvbnRyb2wudmFsdWUpO1xuICAgICAgICBmaWxlcy5mb3JFYWNoKCh7IHNpemUsIG5hbWUgfSkgPT4ge1xuICAgICAgICAgIGlmIChzaXplID4gbWF4U2l6ZSAqIHRoaXMuQ09OVkVSVF9UT19NQikge1xuICAgICAgICAgICAgY29uc3QgaW52YWxpZEZpbGVzID0gZXJyb3JzLnRvb0xhcmdlPy5pbnZhbGlkRmlsZXMgPz8gW107XG4gICAgICAgICAgICBlcnJvcnMudG9vTGFyZ2UgPSB7XG4gICAgICAgICAgICAgIG1heFNpemUsXG4gICAgICAgICAgICAgIGludmFsaWRGaWxlczogWy4uLmludmFsaWRGaWxlcywgbmFtZV0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoZXJyb3JzKS5sZW5ndGggPT09IDAgPyBudWxsIDogZXJyb3JzO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIG1heGltdW0gZW50cmllc1xuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbWF4RW50cmllcyBNYXggbnVtYmVyIG9mIGVudHJpZXNcbiAgICogQHJldHVybnMgVXNlcyAndG9vTWFueUVudHJpZXMnIHZhbGlkYXRvciBlcnJvciB3aXRoIG1heEVudHJpZXMgcHJvcGVydHlcbiAgICogQG1lbWJlck9mIEZpbGVzRm9ybVZhbGlkYXRvcnNcbiAgICovXG4gIG1heEVudHJpZXMobWF4RW50cmllcz86IG51bWJlcik6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IGVycm9yczogVmFsaWRhdGlvbkVycm9ycyA9IHt9O1xuICAgICAgaWYgKG1heEVudHJpZXMgJiYgY29udHJvbC52YWx1ZSkge1xuICAgICAgICBjb25zdCBmaWxlczogRmlsZVtdID0gQXJyYXkuZnJvbShjb250cm9sLnZhbHVlKTtcbiAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCA+IG1heEVudHJpZXMpIHtcbiAgICAgICAgICBlcnJvcnMudG9vTWFueUVudHJpZXMgPSB7IG1heEVudHJpZXMgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGVycm9ycykubGVuZ3RoID09PSAwID8gbnVsbCA6IGVycm9ycztcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBhbGxvd2VkIHR5cGVzXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gYWxsb3dlZFR5cGVzIEFsbG93ZWQgdHlwZXMgb2YgZmlsZXNcbiAgICogQHJldHVybnMgVXNlcyAnbm90UGFyc2FibGUnIHZhbGlkYXRvciBlcnJvciB3aXRoIGFsbG93ZWRUeXBlcyBwcm9wZXJ0eVxuICAgKiBAbWVtYmVyT2YgRmlsZXNGb3JtVmFsaWRhdG9yc1xuICAgKi9cbiAgYWxsb3dlZFR5cGVzKGFsbG93ZWRUeXBlcz86IEFycmF5PHN0cmluZz4pOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XG4gICAgICBjb25zdCBlcnJvcnM6IFZhbGlkYXRpb25FcnJvcnMgPSB7fTtcbiAgICAgIGlmIChhbGxvd2VkVHlwZXMgJiYgY29udHJvbC52YWx1ZSkge1xuICAgICAgICBjb25zdCBmaWxlczogRmlsZVtdID0gQXJyYXkuZnJvbShjb250cm9sLnZhbHVlKTtcbiAgICAgICAgZXJyb3JzLmZpbGVOb3RBbGxvd2VkID0gZmlsZXMuc29tZShcbiAgICAgICAgICAoeyBuYW1lIH0pID0+ICFhbGxvd2VkVHlwZXMuaW5jbHVkZXModGhpcy5nZXRFeHRlbnNpb24obmFtZSkpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZXJyb3JzW09iamVjdC5rZXlzKGVycm9ycyk/LlswXV0gPyBlcnJvcnMgOiBudWxsO1xuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RXh0ZW5zaW9uKGZpbGVuYW1lPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKGZpbGVuYW1lPy5tYXRjaCh0aGlzLmV4dGVuc3Rpb25SZWdFeCkgfHwgW10pWzBdIHx8ICcnO1xuICB9XG59XG4iXX0=