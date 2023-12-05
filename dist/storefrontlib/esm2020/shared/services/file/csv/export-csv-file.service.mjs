/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../file-download.service";
export class ExportCsvFileService {
    constructor(fileDownloadService) {
        this.fileDownloadService = fileDownloadService;
    }
    /**
     * Converts array of objects into CSV data structure.
     *
     * @param objectsArray Array of objects which should be converted to CSV.
     * @param separator Separator for CSV data.
     * @returns Processed string ready to be saved into file.
     */
    convert(objectsArray, separator) {
        return objectsArray.reduce((csvString, row) => {
            const line = row.reduce((currentLine, column) => {
                currentLine += currentLine !== '' ? separator : '';
                const cell = column.includes(separator) ? `"${column}"` : column;
                return `${currentLine}${cell}`;
            }, '');
            return `${csvString}${line}\r\n`;
        }, '');
    }
    /**
     * Creates and download CSV file.
     *
     * @param objectsArray Array of objects which should be converted to CSV.
     * @param separator Separator for CSV data.
     * @param fileOptions Exported file options.
     */
    download(objectsArray, separator, fileOptions) {
        const { fileName, type, extension } = fileOptions;
        const fileContent = this.convert(objectsArray, separator);
        const blob = new Blob([fileContent], { type });
        const url = URL.createObjectURL(blob);
        this.fileDownloadService.download(url, `${fileName}.${extension}`);
    }
}
ExportCsvFileService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ExportCsvFileService, deps: [{ token: i1.FileDownloadService }], target: i0.ɵɵFactoryTarget.Injectable });
ExportCsvFileService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ExportCsvFileService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ExportCsvFileService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.FileDownloadService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LWNzdi1maWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9zZXJ2aWNlcy9maWxlL2Nzdi9leHBvcnQtY3N2LWZpbGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBTzNDLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0IsWUFBc0IsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7SUFBRyxDQUFDO0lBQ2xFOzs7Ozs7T0FNRztJQUNPLE9BQU8sQ0FBQyxZQUF3QixFQUFFLFNBQWlCO1FBQzNELE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQWlCLEVBQUUsR0FBYSxFQUFFLEVBQUU7WUFDOUQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDOUMsV0FBVyxJQUFJLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNuRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ2pFLE9BQU8sR0FBRyxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUM7WUFDakMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ1AsT0FBTyxHQUFHLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FBQztRQUNuQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsUUFBUSxDQUNOLFlBQXdCLEVBQ3hCLFNBQWlCLEVBQ2pCLFdBQThCO1FBRTlCLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLFdBQVcsQ0FBQztRQUNsRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMxRCxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMvQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsUUFBUSxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQzs7aUhBdENVLG9CQUFvQjtxSEFBcEIsb0JBQW9CLGNBRm5CLE1BQU07MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV4cG9ydEZpbGVPcHRpb25zIH0gZnJvbSAnLi4vZXhwb3J0LWZpbGUtb3B0aW9ucyc7XG5pbXBvcnQgeyBGaWxlRG93bmxvYWRTZXJ2aWNlIH0gZnJvbSAnLi4vZmlsZS1kb3dubG9hZC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEV4cG9ydENzdkZpbGVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGZpbGVEb3dubG9hZFNlcnZpY2U6IEZpbGVEb3dubG9hZFNlcnZpY2UpIHt9XG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhcnJheSBvZiBvYmplY3RzIGludG8gQ1NWIGRhdGEgc3RydWN0dXJlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0c0FycmF5IEFycmF5IG9mIG9iamVjdHMgd2hpY2ggc2hvdWxkIGJlIGNvbnZlcnRlZCB0byBDU1YuXG4gICAqIEBwYXJhbSBzZXBhcmF0b3IgU2VwYXJhdG9yIGZvciBDU1YgZGF0YS5cbiAgICogQHJldHVybnMgUHJvY2Vzc2VkIHN0cmluZyByZWFkeSB0byBiZSBzYXZlZCBpbnRvIGZpbGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgY29udmVydChvYmplY3RzQXJyYXk6IHN0cmluZ1tdW10sIHNlcGFyYXRvcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gb2JqZWN0c0FycmF5LnJlZHVjZSgoY3N2U3RyaW5nOiBzdHJpbmcsIHJvdzogc3RyaW5nW10pID0+IHtcbiAgICAgIGNvbnN0IGxpbmUgPSByb3cucmVkdWNlKChjdXJyZW50TGluZSwgY29sdW1uKSA9PiB7XG4gICAgICAgIGN1cnJlbnRMaW5lICs9IGN1cnJlbnRMaW5lICE9PSAnJyA/IHNlcGFyYXRvciA6ICcnO1xuICAgICAgICBjb25zdCBjZWxsID0gY29sdW1uLmluY2x1ZGVzKHNlcGFyYXRvcikgPyBgXCIke2NvbHVtbn1cImAgOiBjb2x1bW47XG4gICAgICAgIHJldHVybiBgJHtjdXJyZW50TGluZX0ke2NlbGx9YDtcbiAgICAgIH0sICcnKTtcbiAgICAgIHJldHVybiBgJHtjc3ZTdHJpbmd9JHtsaW5lfVxcclxcbmA7XG4gICAgfSwgJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5kIGRvd25sb2FkIENTViBmaWxlLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0c0FycmF5IEFycmF5IG9mIG9iamVjdHMgd2hpY2ggc2hvdWxkIGJlIGNvbnZlcnRlZCB0byBDU1YuXG4gICAqIEBwYXJhbSBzZXBhcmF0b3IgU2VwYXJhdG9yIGZvciBDU1YgZGF0YS5cbiAgICogQHBhcmFtIGZpbGVPcHRpb25zIEV4cG9ydGVkIGZpbGUgb3B0aW9ucy5cbiAgICovXG4gIGRvd25sb2FkKFxuICAgIG9iamVjdHNBcnJheTogc3RyaW5nW11bXSxcbiAgICBzZXBhcmF0b3I6IHN0cmluZyxcbiAgICBmaWxlT3B0aW9uczogRXhwb3J0RmlsZU9wdGlvbnNcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBmaWxlTmFtZSwgdHlwZSwgZXh0ZW5zaW9uIH0gPSBmaWxlT3B0aW9ucztcbiAgICBjb25zdCBmaWxlQ29udGVudCA9IHRoaXMuY29udmVydChvYmplY3RzQXJyYXksIHNlcGFyYXRvcik7XG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtmaWxlQ29udGVudF0sIHsgdHlwZSB9KTtcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG4gICAgdGhpcy5maWxlRG93bmxvYWRTZXJ2aWNlLmRvd25sb2FkKHVybCwgYCR7ZmlsZU5hbWV9LiR7ZXh0ZW5zaW9ufWApO1xuICB9XG59XG4iXX0=