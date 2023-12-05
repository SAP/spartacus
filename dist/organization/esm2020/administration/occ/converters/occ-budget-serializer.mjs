/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { TimeUtils } from '@spartacus/core';
import * as i0 from "@angular/core";
export class OccBudgetSerializer {
    constructor() {
        // Intentional empty constructor
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        if (source.startDate) {
            target.startDate = TimeUtils.convertDateToDatetime(source.startDate);
        }
        if (source.endDate) {
            target.endDate = TimeUtils.convertDateToDatetime(source.endDate, true);
        }
        return target;
    }
}
OccBudgetSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccBudgetSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBudgetSerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWJ1ZGdldC1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9vY2MvY29udmVydGVycy9vY2MtYnVkZ2V0LXNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFrQixTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFJNUQsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QjtRQUNFLGdDQUFnQztJQUNsQyxDQUFDO0lBRUQsT0FBTyxDQUFDLE1BQWMsRUFBRSxNQUFtQjtRQUN6QyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEIsTUFBTSxHQUFHLEVBQUUsR0FBSSxNQUFjLEVBQWdCLENBQUM7U0FDL0M7UUFFRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDcEIsTUFBTSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2xCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDeEU7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOztnSEFuQlUsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FETixNQUFNOzJGQUNuQixtQkFBbUI7a0JBRC9CLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udmVydGVyLCBPY2MsIFRpbWVVdGlscyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBCdWRnZXQgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBPY2NCdWRnZXRTZXJpYWxpemVyIGltcGxlbWVudHMgQ29udmVydGVyPEJ1ZGdldCwgT2NjLkJ1ZGdldD4ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBjb25zdHJ1Y3RvclxuICB9XG5cbiAgY29udmVydChzb3VyY2U6IEJ1ZGdldCwgdGFyZ2V0PzogT2NjLkJ1ZGdldCk6IE9jYy5CdWRnZXQge1xuICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0ID0geyAuLi4oc291cmNlIGFzIGFueSkgfSBhcyBPY2MuQnVkZ2V0O1xuICAgIH1cblxuICAgIGlmIChzb3VyY2Uuc3RhcnREYXRlKSB7XG4gICAgICB0YXJnZXQuc3RhcnREYXRlID0gVGltZVV0aWxzLmNvbnZlcnREYXRlVG9EYXRldGltZShzb3VyY2Uuc3RhcnREYXRlKTtcbiAgICB9XG5cbiAgICBpZiAoc291cmNlLmVuZERhdGUpIHtcbiAgICAgIHRhcmdldC5lbmREYXRlID0gVGltZVV0aWxzLmNvbnZlcnREYXRlVG9EYXRldGltZShzb3VyY2UuZW5kRGF0ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxufVxuIl19