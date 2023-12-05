/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NOTIFICATION_PREFERENCE_NORMALIZER, NOTIFICATION_PREFERENCE_SERIALIZER, } from '../../../user/connectors/notification-preference';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../../util/converter.service";
import * as i3 from "../../services/occ-endpoints.service";
const headers = new HttpHeaders({
    'Content-Type': 'application/json',
});
export class OccUserNotificationPreferenceAdapter {
    constructor(http, converter, occEndpoints) {
        this.http = http;
        this.converter = converter;
        this.occEndpoints = occEndpoints;
    }
    loadAll(userId) {
        return this.http
            .get(this.occEndpoints.buildUrl('notificationPreference', {
            urlParams: { userId },
        }), {
            headers,
        })
            .pipe(map((list) => list.preferences ?? []), this.converter.pipeableMany(NOTIFICATION_PREFERENCE_NORMALIZER), catchError((error) => throwError(error)));
    }
    update(userId, preferences) {
        preferences = this.converter.convert(preferences, NOTIFICATION_PREFERENCE_SERIALIZER);
        return this.http
            .patch(this.occEndpoints.buildUrl('notificationPreference', {
            urlParams: { userId },
        }), { preferences: preferences }, { headers })
            .pipe(catchError((error) => throwError(error)));
    }
}
OccUserNotificationPreferenceAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserNotificationPreferenceAdapter, deps: [{ token: i1.HttpClient }, { token: i2.ConverterService }, { token: i3.OccEndpointsService }], target: i0.ɵɵFactoryTarget.Injectable });
OccUserNotificationPreferenceAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserNotificationPreferenceAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccUserNotificationPreferenceAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.ConverterService }, { type: i3.OccEndpointsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXVzZXItbm90aWZpY2F0aW9uLXByZWZlcmVuY2UuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL29jYy9hZGFwdGVycy91c2VyL29jYy11c2VyLW5vdGlmaWNhdGlvbi1wcmVmZXJlbmNlLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBYyxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUtqRCxPQUFPLEVBQ0wsa0NBQWtDLEVBQ2xDLGtDQUFrQyxHQUNuQyxNQUFNLGtEQUFrRCxDQUFDOzs7OztBQUsxRCxNQUFNLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQztJQUM5QixjQUFjLEVBQUUsa0JBQWtCO0NBQ25DLENBQUMsQ0FBQztBQUdILE1BQU0sT0FBTyxvQ0FBb0M7SUFHL0MsWUFDWSxJQUFnQixFQUNoQixTQUEyQixFQUMzQixZQUFpQztRQUZqQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtJQUMxQyxDQUFDO0lBRUosT0FBTyxDQUFDLE1BQWM7UUFDcEIsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FDRixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRTtZQUNuRCxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUU7U0FDdEIsQ0FBQyxFQUNGO1lBQ0UsT0FBTztTQUNSLENBQ0Y7YUFDQSxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxFQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxrQ0FBa0MsQ0FBQyxFQUMvRCxVQUFVLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUM5QyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sQ0FDSixNQUFjLEVBQ2QsV0FBcUM7UUFFckMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUNsQyxXQUFXLEVBQ1gsa0NBQWtDLENBQ25DLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsS0FBSyxDQUNKLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLHdCQUF3QixFQUFFO1lBQ25ELFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRTtTQUN0QixDQUFDLEVBQ0YsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLEVBQzVCLEVBQUUsT0FBTyxFQUFFLENBQ1o7YUFDQSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7O2lJQTNDVSxvQ0FBb0M7cUlBQXBDLG9DQUFvQzsyRkFBcEMsb0NBQW9DO2tCQURoRCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBOb3RpZmljYXRpb25QcmVmZXJlbmNlLFxuICBOb3RpZmljYXRpb25QcmVmZXJlbmNlTGlzdCxcbn0gZnJvbSAnLi4vLi4vLi4vbW9kZWwvbm90aWZpY2F0aW9uLXByZWZlcmVuY2UubW9kZWwnO1xuaW1wb3J0IHtcbiAgTk9USUZJQ0FUSU9OX1BSRUZFUkVOQ0VfTk9STUFMSVpFUixcbiAgTk9USUZJQ0FUSU9OX1BSRUZFUkVOQ0VfU0VSSUFMSVpFUixcbn0gZnJvbSAnLi4vLi4vLi4vdXNlci9jb25uZWN0b3JzL25vdGlmaWNhdGlvbi1wcmVmZXJlbmNlJztcbmltcG9ydCB7IFVzZXJOb3RpZmljYXRpb25QcmVmZXJlbmNlQWRhcHRlciB9IGZyb20gJy4uLy4uLy4uL3VzZXIvY29ubmVjdG9ycy9ub3RpZmljYXRpb24tcHJlZmVyZW5jZS91c2VyLW5vdGlmaWNhdGlvbi1wcmVmZXJlbmNlLmFkYXB0ZXInO1xuaW1wb3J0IHsgQ29udmVydGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3V0aWwvY29udmVydGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2NjRW5kcG9pbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29jYy1lbmRwb2ludHMuc2VydmljZSc7XG5cbmNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxufSk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NVc2VyTm90aWZpY2F0aW9uUHJlZmVyZW5jZUFkYXB0ZXJcbiAgaW1wbGVtZW50cyBVc2VyTm90aWZpY2F0aW9uUHJlZmVyZW5jZUFkYXB0ZXJcbntcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRlcjogQ29udmVydGVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlXG4gICkge31cblxuICBsb2FkQWxsKHVzZXJJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxOb3RpZmljYXRpb25QcmVmZXJlbmNlW10+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0PE5vdGlmaWNhdGlvblByZWZlcmVuY2VMaXN0PihcbiAgICAgICAgdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ25vdGlmaWNhdGlvblByZWZlcmVuY2UnLCB7XG4gICAgICAgICAgdXJsUGFyYW1zOiB7IHVzZXJJZCB9LFxuICAgICAgICB9KSxcbiAgICAgICAge1xuICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKGxpc3QpID0+IGxpc3QucHJlZmVyZW5jZXMgPz8gW10pLFxuICAgICAgICB0aGlzLmNvbnZlcnRlci5waXBlYWJsZU1hbnkoTk9USUZJQ0FUSU9OX1BSRUZFUkVOQ0VfTk9STUFMSVpFUiksXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycm9yOiBhbnkpID0+IHRocm93RXJyb3IoZXJyb3IpKVxuICAgICAgKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBwcmVmZXJlbmNlczogTm90aWZpY2F0aW9uUHJlZmVyZW5jZVtdXG4gICk6IE9ic2VydmFibGU8e30+IHtcbiAgICBwcmVmZXJlbmNlcyA9IHRoaXMuY29udmVydGVyLmNvbnZlcnQoXG4gICAgICBwcmVmZXJlbmNlcyxcbiAgICAgIE5PVElGSUNBVElPTl9QUkVGRVJFTkNFX1NFUklBTElaRVJcbiAgICApO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wYXRjaChcbiAgICAgICAgdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ25vdGlmaWNhdGlvblByZWZlcmVuY2UnLCB7XG4gICAgICAgICAgdXJsUGFyYW1zOiB7IHVzZXJJZCB9LFxuICAgICAgICB9KSxcbiAgICAgICAgeyBwcmVmZXJlbmNlczogcHJlZmVyZW5jZXMgfSxcbiAgICAgICAgeyBoZWFkZXJzIH1cbiAgICAgIClcbiAgICAgIC5waXBlKGNhdGNoRXJyb3IoKGVycm9yOiBhbnkpID0+IHRocm93RXJyb3IoZXJyb3IpKSk7XG4gIH1cbn1cbiJdfQ==