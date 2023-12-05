/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { TimeUtils } from '@spartacus/core';
import * as i0 from "@angular/core";
export class OccBudgetNormalizer {
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        if (source.startDate) {
            target.startDate = TimeUtils.convertDatetimeToDate(source.startDate);
        }
        if (source.endDate) {
            target.endDate = TimeUtils.convertDatetimeToDate(source.endDate);
        }
        return target;
    }
}
OccBudgetNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccBudgetNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWJ1ZGdldC1ub3JtYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9vY2MvY29udmVydGVycy9vY2MtYnVkZ2V0LW5vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFrQixTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFNNUQsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixPQUFPLENBQUMsTUFBa0IsRUFBRSxNQUFlO1FBQ3pDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4QixNQUFNLEdBQUcsRUFBRSxHQUFJLE1BQWMsRUFBWSxDQUFDO1NBQzNDO1FBRUQsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ3BCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN0RTtRQUVELElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNsQixNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbEU7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOztnSEFmVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUZsQixNQUFNOzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIsIE9jYywgVGltZVV0aWxzIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEJ1ZGdldCB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT2NjQnVkZ2V0Tm9ybWFsaXplciBpbXBsZW1lbnRzIENvbnZlcnRlcjxPY2MuQnVkZ2V0LCBCdWRnZXQ+IHtcbiAgY29udmVydChzb3VyY2U6IE9jYy5CdWRnZXQsIHRhcmdldD86IEJ1ZGdldCk6IEJ1ZGdldCB7XG4gICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQgPSB7IC4uLihzb3VyY2UgYXMgYW55KSB9IGFzIEJ1ZGdldDtcbiAgICB9XG5cbiAgICBpZiAoc291cmNlLnN0YXJ0RGF0ZSkge1xuICAgICAgdGFyZ2V0LnN0YXJ0RGF0ZSA9IFRpbWVVdGlscy5jb252ZXJ0RGF0ZXRpbWVUb0RhdGUoc291cmNlLnN0YXJ0RGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKHNvdXJjZS5lbmREYXRlKSB7XG4gICAgICB0YXJnZXQuZW5kRGF0ZSA9IFRpbWVVdGlscy5jb252ZXJ0RGF0ZXRpbWVUb0RhdGUoc291cmNlLmVuZERhdGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbn1cbiJdfQ==