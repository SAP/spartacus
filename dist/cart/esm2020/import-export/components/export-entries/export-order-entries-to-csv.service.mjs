/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { GlobalMessageType, } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/cart/import-export/core";
import * as i3 from "@spartacus/core";
export class ExportOrderEntriesToCsvService {
    constructor(exportCsvFileService, importExportConfig, globalMessageService, translationService) {
        this.exportCsvFileService = exportCsvFileService;
        this.importExportConfig = importExportConfig;
        this.globalMessageService = globalMessageService;
        this.translationService = translationService;
        this.columns = [
            {
                name: {
                    key: 'code',
                },
                value: 'product.code',
            },
            {
                name: {
                    key: 'quantity',
                },
                value: 'quantity',
            },
            ...(this.exportConfig?.additionalColumns ?? []),
        ];
    }
    get exportConfig() {
        return this.importExportConfig.cartImportExport?.export;
    }
    get separator() {
        return this.importExportConfig.cartImportExport?.file.separator;
    }
    downloadCsv(entries) {
        this.getResolvedEntries(entries)
            .pipe(take(1))
            .subscribe((csvData) => this.download(csvData));
    }
    resolveValue(combinedKeys, entry) {
        return (combinedKeys
            .split('.')
            .reduce((obj, key) => (obj ? obj[key] : ''), entry)
            ?.toString() ?? '');
    }
    resolveValues(entries) {
        return entries.map((entry) => this.columns.map((column) => this.resolveValue(column.value, entry)));
    }
    getTranslatedColumnHeaders() {
        return combineLatest(this.columns.map((column) => this.translationService.translate(`exportEntries.columnNames.${column.name.key}`)));
    }
    displayExportMessage() {
        this.globalMessageService.add({ key: 'exportEntries.exportMessage' }, GlobalMessageType.MSG_TYPE_INFO);
    }
    limitValues(data) {
        return this.exportConfig?.maxEntries
            ? data.splice(0, this.exportConfig?.maxEntries)
            : data;
    }
    getResolvedEntries(entries) {
        const values = this.limitValues(this.resolveValues(entries));
        return this.getTranslatedColumnHeaders().pipe(map((headers) => {
            return [headers, ...values];
        }));
    }
    download(entries) {
        if (this.exportConfig?.messageEnabled) {
            this.displayExportMessage();
        }
        setTimeout(() => {
            if (this.exportConfig !== undefined && this.separator !== undefined) {
                this.exportCsvFileService.download(entries, this.separator, this.exportConfig.fileOptions);
            }
        }, this.exportConfig?.downloadDelay ?? 0);
    }
}
ExportOrderEntriesToCsvService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ExportOrderEntriesToCsvService, deps: [{ token: i1.ExportCsvFileService }, { token: i2.ImportExportConfig }, { token: i3.GlobalMessageService }, { token: i3.TranslationService }], target: i0.ɵɵFactoryTarget.Injectable });
ExportOrderEntriesToCsvService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ExportOrderEntriesToCsvService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ExportOrderEntriesToCsvService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ExportCsvFileService }, { type: i2.ImportExportConfig }, { type: i3.GlobalMessageService }, { type: i3.TranslationService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LW9yZGVyLWVudHJpZXMtdG8tY3N2LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9pbXBvcnQtZXhwb3J0L2NvbXBvbmVudHMvZXhwb3J0LWVudHJpZXMvZXhwb3J0LW9yZGVyLWVudHJpZXMtdG8tY3N2LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPM0MsT0FBTyxFQUVMLGlCQUFpQixHQUVsQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFLM0MsTUFBTSxPQUFPLDhCQUE4QjtJQUN6QyxZQUNZLG9CQUEwQyxFQUMxQyxrQkFBc0MsRUFDdEMsb0JBQTBDLEVBQzFDLGtCQUFzQztRQUh0Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBV3hDLFlBQU8sR0FBbUI7WUFDbEM7Z0JBQ0UsSUFBSSxFQUFFO29CQUNKLEdBQUcsRUFBRSxNQUFNO2lCQUNaO2dCQUNELEtBQUssRUFBRSxjQUFjO2FBQ3RCO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFO29CQUNKLEdBQUcsRUFBRSxVQUFVO2lCQUNoQjtnQkFDRCxLQUFLLEVBQUUsVUFBVTthQUNsQjtZQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGlCQUFpQixJQUFJLEVBQUUsQ0FBQztTQUNoRCxDQUFDO0lBeEJDLENBQUM7SUFFSixJQUFjLFlBQVk7UUFD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aEMsT0FBTyxFQUNQLElBQUksQ0FBQyxTQUFTLEVBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQzlCLENBQUM7YUFDSDtRQUNILENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLGFBQWEsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDOzsySEFsR1UsOEJBQThCOytIQUE5Qiw4QkFBOEIsY0FGN0IsTUFBTTsyRkFFUCw4QkFBOEI7a0JBSDFDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXJFbnRyeSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgRXhwb3J0Q29sdW1uLFxuICBFeHBvcnRDb25maWcsXG4gIEltcG9ydEV4cG9ydENvbmZpZyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2ltcG9ydC1leHBvcnQvY29yZSc7XG5pbXBvcnQge1xuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG4gIFRyYW5zbGF0aW9uU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEV4cG9ydENzdkZpbGVTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEV4cG9ydE9yZGVyRW50cmllc1RvQ3N2U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBleHBvcnRDc3ZGaWxlU2VydmljZTogRXhwb3J0Q3N2RmlsZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGltcG9ydEV4cG9ydENvbmZpZzogSW1wb3J0RXhwb3J0Q29uZmlnLFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uU2VydmljZTogVHJhbnNsYXRpb25TZXJ2aWNlXG4gICkge31cblxuICBwcm90ZWN0ZWQgZ2V0IGV4cG9ydENvbmZpZygpOiBFeHBvcnRDb25maWcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmltcG9ydEV4cG9ydENvbmZpZy5jYXJ0SW1wb3J0RXhwb3J0Py5leHBvcnQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IHNlcGFyYXRvcigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmltcG9ydEV4cG9ydENvbmZpZy5jYXJ0SW1wb3J0RXhwb3J0Py5maWxlLnNlcGFyYXRvcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb2x1bW5zOiBFeHBvcnRDb2x1bW5bXSA9IFtcbiAgICB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIGtleTogJ2NvZGUnLFxuICAgICAgfSxcbiAgICAgIHZhbHVlOiAncHJvZHVjdC5jb2RlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAga2V5OiAncXVhbnRpdHknLFxuICAgICAgfSxcbiAgICAgIHZhbHVlOiAncXVhbnRpdHknLFxuICAgIH0sXG4gICAgLi4uKHRoaXMuZXhwb3J0Q29uZmlnPy5hZGRpdGlvbmFsQ29sdW1ucyA/PyBbXSksXG4gIF07XG5cbiAgZG93bmxvYWRDc3YoZW50cmllczogT3JkZXJFbnRyeVtdKTogdm9pZCB7XG4gICAgdGhpcy5nZXRSZXNvbHZlZEVudHJpZXMoZW50cmllcylcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKChjc3ZEYXRhOiBzdHJpbmdbXVtdKSA9PiB0aGlzLmRvd25sb2FkKGNzdkRhdGEpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZXNvbHZlVmFsdWUoY29tYmluZWRLZXlzOiBzdHJpbmcsIGVudHJ5OiBPcmRlckVudHJ5KTogc3RyaW5nIHtcbiAgICByZXR1cm4gKFxuICAgICAgY29tYmluZWRLZXlzXG4gICAgICAgIC5zcGxpdCgnLicpXG4gICAgICAgIC5yZWR1Y2UoKG9iaiwga2V5KSA9PiAob2JqID8gKG9iaiBhcyBhbnkpW2tleV0gOiAnJyksIGVudHJ5KVxuICAgICAgICA/LnRvU3RyaW5nKCkgPz8gJydcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlc29sdmVWYWx1ZXMoZW50cmllczogT3JkZXJFbnRyeVtdKTogc3RyaW5nW11bXSB7XG4gICAgcmV0dXJuIGVudHJpZXMubWFwKChlbnRyeSkgPT5cbiAgICAgIHRoaXMuY29sdW1ucy5tYXAoKGNvbHVtbikgPT4gdGhpcy5yZXNvbHZlVmFsdWUoY29sdW1uLnZhbHVlLCBlbnRyeSkpXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRUcmFuc2xhdGVkQ29sdW1uSGVhZGVycygpOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLmNvbHVtbnMubWFwKChjb2x1bW4pID0+XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlLnRyYW5zbGF0ZShcbiAgICAgICAgICBgZXhwb3J0RW50cmllcy5jb2x1bW5OYW1lcy4ke2NvbHVtbi5uYW1lLmtleX1gXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRpc3BsYXlFeHBvcnRNZXNzYWdlKCk6IHZvaWQge1xuICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgeyBrZXk6ICdleHBvcnRFbnRyaWVzLmV4cG9ydE1lc3NhZ2UnIH0sXG4gICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9JTkZPXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBsaW1pdFZhbHVlcyhkYXRhOiBzdHJpbmdbXVtdKTogc3RyaW5nW11bXSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwb3J0Q29uZmlnPy5tYXhFbnRyaWVzXG4gICAgICA/IGRhdGEuc3BsaWNlKDAsIHRoaXMuZXhwb3J0Q29uZmlnPy5tYXhFbnRyaWVzKVxuICAgICAgOiBkYXRhO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFJlc29sdmVkRW50cmllcyhlbnRyaWVzOiBPcmRlckVudHJ5W10pOiBPYnNlcnZhYmxlPHN0cmluZ1tdW10+IHtcbiAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmxpbWl0VmFsdWVzKHRoaXMucmVzb2x2ZVZhbHVlcyhlbnRyaWVzKSk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VHJhbnNsYXRlZENvbHVtbkhlYWRlcnMoKS5waXBlKFxuICAgICAgbWFwKChoZWFkZXJzKSA9PiB7XG4gICAgICAgIHJldHVybiBbaGVhZGVycywgLi4udmFsdWVzXTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkb3dubG9hZChlbnRyaWVzOiBzdHJpbmdbXVtdKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZXhwb3J0Q29uZmlnPy5tZXNzYWdlRW5hYmxlZCkge1xuICAgICAgdGhpcy5kaXNwbGF5RXhwb3J0TWVzc2FnZSgpO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmV4cG9ydENvbmZpZyAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2VwYXJhdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5leHBvcnRDc3ZGaWxlU2VydmljZS5kb3dubG9hZChcbiAgICAgICAgICBlbnRyaWVzLFxuICAgICAgICAgIHRoaXMuc2VwYXJhdG9yLFxuICAgICAgICAgIHRoaXMuZXhwb3J0Q29uZmlnLmZpbGVPcHRpb25zXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSwgdGhpcy5leHBvcnRDb25maWc/LmRvd25sb2FkRGVsYXkgPz8gMCk7XG4gIH1cbn1cbiJdfQ==