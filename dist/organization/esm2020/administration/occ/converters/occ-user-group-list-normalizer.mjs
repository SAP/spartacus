/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { USER_GROUP_NORMALIZER, } from '@spartacus/organization/administration/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class OccUserGroupListNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        target.values = source.orgUnitUserGroups.map((userGroup) => ({
            ...this.converter.convert(userGroup, USER_GROUP_NORMALIZER),
        }));
        return target;
    }
}
OccUserGroupListNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserGroupListNormalizer, deps: [{ token: i1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccUserGroupListNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserGroupListNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserGroupListNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXVzZXItZ3JvdXAtbGlzdC1ub3JtYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9vY2MvY29udmVydGVycy9vY2MtdXNlci1ncm91cC1saXN0LW5vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPM0MsT0FBTyxFQUVMLHFCQUFxQixHQUN0QixNQUFNLDZDQUE2QyxDQUFDOzs7QUFLckQsTUFBTSxPQUFPLDBCQUEwQjtJQUdyQyxZQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtJQUFHLENBQUM7SUFFbkQsT0FBTyxDQUNMLE1BQWdDLEVBQ2hDLE1BQWlDO1FBRWpDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4QixNQUFNLEdBQUcsRUFBRSxHQUFJLE1BQWMsRUFBOEIsQ0FBQztTQUM3RDtRQUNELE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzRCxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxxQkFBcUIsQ0FBQztTQUM1RCxDQUFDLENBQUMsQ0FBQztRQUNKLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7O3VIQWhCVSwwQkFBMEI7MkhBQTFCLDBCQUEwQixjQUZ6QixNQUFNOzJGQUVQLDBCQUEwQjtrQkFIdEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb252ZXJ0ZXIsXG4gIENvbnZlcnRlclNlcnZpY2UsXG4gIEVudGl0aWVzTW9kZWwsXG4gIE9jYyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIFVzZXJHcm91cCxcbiAgVVNFUl9HUk9VUF9OT1JNQUxJWkVSLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE9jY1VzZXJHcm91cExpc3ROb3JtYWxpemVyXG4gIGltcGxlbWVudHMgQ29udmVydGVyPE9jYy5PcmdVbml0VXNlckdyb3VwTGlzdCwgRW50aXRpZXNNb2RlbDxVc2VyR3JvdXA+Plxue1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnZlcnRlcjogQ29udmVydGVyU2VydmljZSkge31cblxuICBjb252ZXJ0KFxuICAgIHNvdXJjZTogT2NjLk9yZ1VuaXRVc2VyR3JvdXBMaXN0LFxuICAgIHRhcmdldD86IEVudGl0aWVzTW9kZWw8VXNlckdyb3VwPlxuICApOiBFbnRpdGllc01vZGVsPFVzZXJHcm91cD4ge1xuICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0ID0geyAuLi4oc291cmNlIGFzIGFueSkgfSBhcyBFbnRpdGllc01vZGVsPFVzZXJHcm91cD47XG4gICAgfVxuICAgIHRhcmdldC52YWx1ZXMgPSBzb3VyY2Uub3JnVW5pdFVzZXJHcm91cHMubWFwKCh1c2VyR3JvdXApID0+ICh7XG4gICAgICAuLi50aGlzLmNvbnZlcnRlci5jb252ZXJ0KHVzZXJHcm91cCwgVVNFUl9HUk9VUF9OT1JNQUxJWkVSKSxcbiAgICB9KSk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxufVxuIl19