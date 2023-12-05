/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { SubListService } from '../../../shared/sub-list/sub-list.service';
import { OrganizationTableType } from '../../../shared/organization.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/organization/administration/core";
export class UnitChildrenService extends SubListService {
    constructor(tableService, orgUnitService) {
        super(tableService);
        this.tableService = tableService;
        this.orgUnitService = orgUnitService;
        this.tableType = OrganizationTableType.UNIT_CHILDREN;
        this._domainType = OrganizationTableType.UNIT;
    }
    // method to be adjusted for proper children list when ready
    load(_pagination, code) {
        return this.orgUnitService.getChildUnits(code);
    }
}
UnitChildrenService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenService, deps: [{ token: i1.TableService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitChildrenService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.OrgUnitService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1jaGlsZHJlbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VuaXQvbGlua3MvY2hpbGRyZW4vdW5pdC1jaGlsZHJlbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUMzRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7OztBQUszRSxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsY0FBMkI7SUFJbEUsWUFDWSxZQUEwQixFQUMxQixjQUE4QjtRQUV4QyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFIVixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFMaEMsY0FBUyxHQUFHLHFCQUFxQixDQUFDLGFBQWEsQ0FBQztRQUNoRCxnQkFBVyxHQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQztJQU9uRCxDQUFDO0lBRUQsNERBQTREO0lBQ2xELElBQUksQ0FDWixXQUE0QixFQUM1QixJQUFZO1FBRVosT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDOztnSEFqQlUsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FGbEIsTUFBTTsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRW50aXRpZXNNb2RlbCwgUGFnaW5hdGlvbk1vZGVsIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEIyQlVuaXROb2RlLFxuICBPcmdVbml0U2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBUYWJsZVNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3ViTGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc3ViLWxpc3Qvc3ViLWxpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25UYWJsZVR5cGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvb3JnYW5pemF0aW9uLm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRDaGlsZHJlblNlcnZpY2UgZXh0ZW5kcyBTdWJMaXN0U2VydmljZTxCMkJVbml0Tm9kZT4ge1xuICBwcm90ZWN0ZWQgdGFibGVUeXBlID0gT3JnYW5pemF0aW9uVGFibGVUeXBlLlVOSVRfQ0hJTERSRU47XG4gIHByb3RlY3RlZCBfZG9tYWluVHlwZSA9IE9yZ2FuaXphdGlvblRhYmxlVHlwZS5VTklUO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB0YWJsZVNlcnZpY2U6IFRhYmxlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgb3JnVW5pdFNlcnZpY2U6IE9yZ1VuaXRTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKHRhYmxlU2VydmljZSk7XG4gIH1cblxuICAvLyBtZXRob2QgdG8gYmUgYWRqdXN0ZWQgZm9yIHByb3BlciBjaGlsZHJlbiBsaXN0IHdoZW4gcmVhZHlcbiAgcHJvdGVjdGVkIGxvYWQoXG4gICAgX3BhZ2luYXRpb246IFBhZ2luYXRpb25Nb2RlbCxcbiAgICBjb2RlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxFbnRpdGllc01vZGVsPEIyQlVuaXROb2RlPj4ge1xuICAgIHJldHVybiB0aGlzLm9yZ1VuaXRTZXJ2aWNlLmdldENoaWxkVW5pdHMoY29kZSk7XG4gIH1cbn1cbiJdfQ==