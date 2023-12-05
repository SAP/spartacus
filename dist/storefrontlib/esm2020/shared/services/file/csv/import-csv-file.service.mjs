/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../file-reader.service";
export class ImportCsvFileService {
    constructor(fileReaderService) {
        this.fileReaderService = fileReaderService;
    }
    /**
     * Load CSV file.
     *
     * @param file File we want to load as CSV.
     * @param separator Separator for CSV data.
     * @return {Observable<string[][]>} Imported file
     */
    loadFile(file, separator) {
        return this.fileReaderService
            .loadTextFile(file)
            .pipe(map((res) => this.parse(res, separator)));
    }
    /**
     * Combined csv validation
     *
     * @param file File we want to load as CSV.
     * @param separator Separator for CSV data.
     * @param isDataParsable (optional) Callback for verify that structure type is proper.
     * @param maxEntries (optional) Limitation for maximum entries count.
     * @return {Observable<CsvFileValidationErrors | null>} Result of validation
     */
    validateFile(file, { separator, isDataParsable, maxEntries, }) {
        const validationErrors = {};
        return this.fileReaderService.loadTextFile(file).pipe(tap((data) => {
            this.validateEmpty(data, validationErrors);
        }), map((res) => this.parse(res, separator)), tap((data) => {
            this.validateNotParsable(data, validationErrors, isDataParsable);
            this.validateTooManyEntries(data, validationErrors, maxEntries);
        }), catchError((errors) => of(errors)), map(() => Object.keys(validationErrors).length === 0 ? null : validationErrors));
    }
    /**
     * Processes the CSV data
     *
     * @param csvString raw extracted data from CSV
     * @param separator for csv data
     * @param ignoreHeader (optional) flag allows for ignore headers row while reading
     * @returns {string[][]} Parsed file
     */
    parse(csvString, separator, ignoreHeader = true) {
        return csvString
            .split('\n')
            .map((row) => row.split(separator).map((cell) => cell.replace(/"/g, '')))
            .filter((value, index) => !(ignoreHeader && index === 0) && value[0] !== '');
    }
    validateEmpty(data, errors) {
        if (data.toString().length === 0) {
            errors.empty = true;
            throw errors;
        }
    }
    validateTooManyEntries(data, errors, maxEntries) {
        if (maxEntries && data.length > maxEntries) {
            errors.tooManyEntries = { maxEntries };
            throw errors;
        }
    }
    validateNotParsable(data, errors, isDataParsable) {
        if (isDataParsable && !isDataParsable(data)) {
            errors.notParsable = true;
            throw errors;
        }
    }
}
ImportCsvFileService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportCsvFileService, deps: [{ token: i1.FileReaderService }], target: i0.ɵɵFactoryTarget.Injectable });
ImportCsvFileService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportCsvFileService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportCsvFileService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.FileReaderService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWNzdi1maWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9zZXJ2aWNlcy9maWxlL2Nzdi9pbXBvcnQtY3N2LWZpbGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFPdEQsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixZQUFzQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUFHLENBQUM7SUFDOUQ7Ozs7OztPQU1HO0lBQ0gsUUFBUSxDQUFDLElBQVUsRUFBRSxTQUFpQjtRQUNwQyxPQUFPLElBQUksQ0FBQyxpQkFBaUI7YUFDMUIsWUFBWSxDQUFDLElBQUksQ0FBQzthQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxDQUNWLElBQVUsRUFDVixFQUNFLFNBQVMsRUFDVCxjQUFjLEVBQ2QsVUFBVSxHQUtYO1FBRUQsTUFBTSxnQkFBZ0IsR0FBNEIsRUFBRSxDQUFDO1FBQ3JELE9BQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQ3pDLENBQUMsSUFBSSxDQUNKLEdBQUcsQ0FBQyxDQUFDLElBQVksRUFBRSxFQUFFO1lBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLEVBQ0YsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUN4QyxHQUFHLENBQUMsQ0FBQyxJQUFnQixFQUFFLEVBQUU7WUFDdkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxFQUNGLFVBQVUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQ2xDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FDUCxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FDckUsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDTyxLQUFLLENBQ2IsU0FBaUIsRUFDakIsU0FBaUIsRUFDakIsWUFBWSxHQUFHLElBQUk7UUFFbkIsT0FBTyxTQUFTO2FBQ2IsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNYLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDeEUsTUFBTSxDQUNMLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FDcEUsQ0FBQztJQUNOLENBQUM7SUFFUyxhQUFhLENBQUMsSUFBWSxFQUFFLE1BQXdCO1FBQzVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDaEMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDcEIsTUFBTSxNQUFNLENBQUM7U0FDZDtJQUNILENBQUM7SUFFUyxzQkFBc0IsQ0FDOUIsSUFBZ0IsRUFDaEIsTUFBd0IsRUFDeEIsVUFBbUI7UUFFbkIsSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLEVBQUU7WUFDMUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxFQUFFLFVBQVUsRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sTUFBTSxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBRVMsbUJBQW1CLENBQzNCLElBQWdCLEVBQ2hCLE1BQXdCLEVBQ3hCLGNBQThDO1FBRTlDLElBQUksY0FBYyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzNDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQzFCLE1BQU0sTUFBTSxDQUFDO1NBQ2Q7SUFDSCxDQUFDOztpSEF2R1Usb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FGbkIsTUFBTTsyRkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkVycm9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEZpbGVSZWFkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZmlsZS1yZWFkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDc3ZGaWxlVmFsaWRhdGlvbkVycm9ycyB9IGZyb20gJy4vY3N2LWZpbGUtdmFsaWRhdGlvbi1lcnJvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgSW1wb3J0Q3N2RmlsZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZmlsZVJlYWRlclNlcnZpY2U6IEZpbGVSZWFkZXJTZXJ2aWNlKSB7fVxuICAvKipcbiAgICogTG9hZCBDU1YgZmlsZS5cbiAgICpcbiAgICogQHBhcmFtIGZpbGUgRmlsZSB3ZSB3YW50IHRvIGxvYWQgYXMgQ1NWLlxuICAgKiBAcGFyYW0gc2VwYXJhdG9yIFNlcGFyYXRvciBmb3IgQ1NWIGRhdGEuXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8c3RyaW5nW11bXT59IEltcG9ydGVkIGZpbGVcbiAgICovXG4gIGxvYWRGaWxlKGZpbGU6IEZpbGUsIHNlcGFyYXRvcjogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmdbXVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZmlsZVJlYWRlclNlcnZpY2VcbiAgICAgIC5sb2FkVGV4dEZpbGUoZmlsZSlcbiAgICAgIC5waXBlKG1hcCgocmVzKSA9PiB0aGlzLnBhcnNlKHJlcyBhcyBzdHJpbmcsIHNlcGFyYXRvcikpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21iaW5lZCBjc3YgdmFsaWRhdGlvblxuICAgKlxuICAgKiBAcGFyYW0gZmlsZSBGaWxlIHdlIHdhbnQgdG8gbG9hZCBhcyBDU1YuXG4gICAqIEBwYXJhbSBzZXBhcmF0b3IgU2VwYXJhdG9yIGZvciBDU1YgZGF0YS5cbiAgICogQHBhcmFtIGlzRGF0YVBhcnNhYmxlIChvcHRpb25hbCkgQ2FsbGJhY2sgZm9yIHZlcmlmeSB0aGF0IHN0cnVjdHVyZSB0eXBlIGlzIHByb3Blci5cbiAgICogQHBhcmFtIG1heEVudHJpZXMgKG9wdGlvbmFsKSBMaW1pdGF0aW9uIGZvciBtYXhpbXVtIGVudHJpZXMgY291bnQuXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8Q3N2RmlsZVZhbGlkYXRpb25FcnJvcnMgfCBudWxsPn0gUmVzdWx0IG9mIHZhbGlkYXRpb25cbiAgICovXG4gIHZhbGlkYXRlRmlsZShcbiAgICBmaWxlOiBGaWxlLFxuICAgIHtcbiAgICAgIHNlcGFyYXRvcixcbiAgICAgIGlzRGF0YVBhcnNhYmxlLFxuICAgICAgbWF4RW50cmllcyxcbiAgICB9OiB7XG4gICAgICBzZXBhcmF0b3I6IHN0cmluZztcbiAgICAgIGlzRGF0YVBhcnNhYmxlPzogKGRhdGE6IHN0cmluZ1tdW10pID0+IGJvb2xlYW47XG4gICAgICBtYXhFbnRyaWVzPzogbnVtYmVyO1xuICAgIH1cbiAgKTogT2JzZXJ2YWJsZTxDc3ZGaWxlVmFsaWRhdGlvbkVycm9ycyB8IG51bGw+IHtcbiAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3JzOiBDc3ZGaWxlVmFsaWRhdGlvbkVycm9ycyA9IHt9O1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmZpbGVSZWFkZXJTZXJ2aWNlLmxvYWRUZXh0RmlsZShmaWxlKSBhcyBPYnNlcnZhYmxlPHN0cmluZz5cbiAgICApLnBpcGUoXG4gICAgICB0YXAoKGRhdGE6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLnZhbGlkYXRlRW1wdHkoZGF0YSwgdmFsaWRhdGlvbkVycm9ycyk7XG4gICAgICB9KSxcbiAgICAgIG1hcCgocmVzKSA9PiB0aGlzLnBhcnNlKHJlcywgc2VwYXJhdG9yKSksXG4gICAgICB0YXAoKGRhdGE6IHN0cmluZ1tdW10pID0+IHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZU5vdFBhcnNhYmxlKGRhdGEsIHZhbGlkYXRpb25FcnJvcnMsIGlzRGF0YVBhcnNhYmxlKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVRvb01hbnlFbnRyaWVzKGRhdGEsIHZhbGlkYXRpb25FcnJvcnMsIG1heEVudHJpZXMpO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKChlcnJvcnMpID0+IG9mKGVycm9ycykpLFxuICAgICAgbWFwKCgpID0+XG4gICAgICAgIE9iamVjdC5rZXlzKHZhbGlkYXRpb25FcnJvcnMpLmxlbmd0aCA9PT0gMCA/IG51bGwgOiB2YWxpZGF0aW9uRXJyb3JzXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgdGhlIENTViBkYXRhXG4gICAqXG4gICAqIEBwYXJhbSBjc3ZTdHJpbmcgcmF3IGV4dHJhY3RlZCBkYXRhIGZyb20gQ1NWXG4gICAqIEBwYXJhbSBzZXBhcmF0b3IgZm9yIGNzdiBkYXRhXG4gICAqIEBwYXJhbSBpZ25vcmVIZWFkZXIgKG9wdGlvbmFsKSBmbGFnIGFsbG93cyBmb3IgaWdub3JlIGhlYWRlcnMgcm93IHdoaWxlIHJlYWRpbmdcbiAgICogQHJldHVybnMge3N0cmluZ1tdW119IFBhcnNlZCBmaWxlXG4gICAqL1xuICBwcm90ZWN0ZWQgcGFyc2UoXG4gICAgY3N2U3RyaW5nOiBzdHJpbmcsXG4gICAgc2VwYXJhdG9yOiBzdHJpbmcsXG4gICAgaWdub3JlSGVhZGVyID0gdHJ1ZVxuICApOiBzdHJpbmdbXVtdIHtcbiAgICByZXR1cm4gY3N2U3RyaW5nXG4gICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAubWFwKChyb3cpID0+IHJvdy5zcGxpdChzZXBhcmF0b3IpLm1hcCgoY2VsbCkgPT4gY2VsbC5yZXBsYWNlKC9cIi9nLCAnJykpKVxuICAgICAgLmZpbHRlcihcbiAgICAgICAgKHZhbHVlLCBpbmRleCkgPT4gIShpZ25vcmVIZWFkZXIgJiYgaW5kZXggPT09IDApICYmIHZhbHVlWzBdICE9PSAnJ1xuICAgICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCB2YWxpZGF0ZUVtcHR5KGRhdGE6IHN0cmluZywgZXJyb3JzOiBWYWxpZGF0aW9uRXJyb3JzKTogdm9pZCB7XG4gICAgaWYgKGRhdGEudG9TdHJpbmcoKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGVycm9ycy5lbXB0eSA9IHRydWU7XG4gICAgICB0aHJvdyBlcnJvcnM7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHZhbGlkYXRlVG9vTWFueUVudHJpZXMoXG4gICAgZGF0YTogc3RyaW5nW11bXSxcbiAgICBlcnJvcnM6IFZhbGlkYXRpb25FcnJvcnMsXG4gICAgbWF4RW50cmllcz86IG51bWJlclxuICApOiB2b2lkIHtcbiAgICBpZiAobWF4RW50cmllcyAmJiBkYXRhLmxlbmd0aCA+IG1heEVudHJpZXMpIHtcbiAgICAgIGVycm9ycy50b29NYW55RW50cmllcyA9IHsgbWF4RW50cmllcyB9O1xuICAgICAgdGhyb3cgZXJyb3JzO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCB2YWxpZGF0ZU5vdFBhcnNhYmxlKFxuICAgIGRhdGE6IHN0cmluZ1tdW10sXG4gICAgZXJyb3JzOiBWYWxpZGF0aW9uRXJyb3JzLFxuICAgIGlzRGF0YVBhcnNhYmxlPzogKGRhdGE6IHN0cmluZ1tdW10pID0+IGJvb2xlYW5cbiAgKTogdm9pZCB7XG4gICAgaWYgKGlzRGF0YVBhcnNhYmxlICYmICFpc0RhdGFQYXJzYWJsZShkYXRhKSkge1xuICAgICAgZXJyb3JzLm5vdFBhcnNhYmxlID0gdHJ1ZTtcbiAgICAgIHRocm93IGVycm9ycztcbiAgICB9XG4gIH1cbn1cbiJdfQ==