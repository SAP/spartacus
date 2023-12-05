import { Injectable } from '@angular/core';
import { PERMISSIONS_NORMALIZER, PERMISSION_NORMALIZER, PERMISSION_TYPES_NORMALIZER, PERMISSION_SERIALIZER, } from '@spartacus/organization/administration/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccPermissionAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    load(userId, permissionCode) {
        return this.http
            .get(this.getPermissionEndpoint(userId, permissionCode))
            .pipe(this.converter.pipeable(PERMISSION_NORMALIZER));
    }
    loadList(userId, params) {
        return this.http
            .get(this.getPermissionsEndpoint(userId, params))
            .pipe(this.converter.pipeable(PERMISSIONS_NORMALIZER));
    }
    create(userId, permission) {
        permission = this.converter.convert(permission, PERMISSION_SERIALIZER);
        return this.http
            .post(this.getPermissionsEndpoint(userId), permission)
            .pipe(this.converter.pipeable(PERMISSION_NORMALIZER));
    }
    update(userId, permissionCode, permission) {
        permission = this.converter.convert(permission, PERMISSION_SERIALIZER);
        return this.http
            .patch(this.getPermissionEndpoint(userId, permissionCode), permission)
            .pipe(this.converter.pipeable(PERMISSION_NORMALIZER));
    }
    loadTypes() {
        return this.http
            .get(this.getPermissionTypesEndpoint())
            .pipe(this.converter.pipeable(PERMISSION_TYPES_NORMALIZER));
    }
    getPermissionEndpoint(userId, orderApprovalPermissionCode) {
        return this.occEndpoints.buildUrl('permission', {
            urlParams: {
                userId,
                orderApprovalPermissionCode,
            },
        });
    }
    getPermissionsEndpoint(userId, params) {
        return this.occEndpoints.buildUrl('permissions', {
            urlParams: { userId },
            queryParams: params,
        });
    }
    getPermissionTypesEndpoint() {
        return this.occEndpoints.buildUrl('orderApprovalPermissionTypes');
    }
}
OccPermissionAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccPermissionAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPermissionAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXBlcm1pc3Npb24uYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vb2NjL2FkYXB0ZXJzL29jYy1wZXJtaXNzaW9uLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVMzQyxPQUFPLEVBR0wsc0JBQXNCLEVBQ3RCLHFCQUFxQixFQUNyQiwyQkFBMkIsRUFDM0IscUJBQXFCLEdBQ3RCLE1BQU0sNkNBQTZDLENBQUM7Ozs7QUFJckQsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixZQUNZLElBQWdCLEVBQ2hCLFlBQWlDLEVBQ2pDLFNBQTJCO1FBRjNCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQ3BDLENBQUM7SUFFSixJQUFJLENBQUMsTUFBYyxFQUFFLGNBQXNCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQWlCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUM7YUFDdkUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsUUFBUSxDQUNOLE1BQWMsRUFDZCxNQUFxQjtRQUVyQixPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFzQixJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ3JFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFjLEVBQUUsVUFBc0I7UUFDM0MsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3ZFLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQWlCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFVLENBQUM7YUFDckUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsTUFBTSxDQUNKLE1BQWMsRUFDZCxjQUFzQixFQUN0QixVQUFzQjtRQUV0QixVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDdkUsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEtBQUssQ0FDSixJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxFQUNsRCxVQUFVLENBQ1g7YUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FDRixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FDbEM7YUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFUyxxQkFBcUIsQ0FDN0IsTUFBYyxFQUNkLDJCQUFtQztRQUVuQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRTtZQUM5QyxTQUFTLEVBQUU7Z0JBQ1QsTUFBTTtnQkFDTiwyQkFBMkI7YUFDNUI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsc0JBQXNCLENBQzlCLE1BQWMsRUFDZCxNQUFxQjtRQUVyQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUMvQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUU7WUFDckIsV0FBVyxFQUFFLE1BQU07U0FDcEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLDBCQUEwQjtRQUNsQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDcEUsQ0FBQzs7aUhBM0VVLG9CQUFvQjtxSEFBcEIsb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBRGhDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29udmVydGVyU2VydmljZSxcbiAgRW50aXRpZXNNb2RlbCxcbiAgT2NjLFxuICBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICBTZWFyY2hDb25maWcsXG4gIE9yZGVyQXBwcm92YWxQZXJtaXNzaW9uVHlwZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIFBlcm1pc3Npb24sXG4gIFBlcm1pc3Npb25BZGFwdGVyLFxuICBQRVJNSVNTSU9OU19OT1JNQUxJWkVSLFxuICBQRVJNSVNTSU9OX05PUk1BTElaRVIsXG4gIFBFUk1JU1NJT05fVFlQRVNfTk9STUFMSVpFUixcbiAgUEVSTUlTU0lPTl9TRVJJQUxJWkVSLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9jY1Blcm1pc3Npb25BZGFwdGVyIGltcGxlbWVudHMgUGVybWlzc2lvbkFkYXB0ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb252ZXJ0ZXI6IENvbnZlcnRlclNlcnZpY2VcbiAgKSB7fVxuXG4gIGxvYWQodXNlcklkOiBzdHJpbmcsIHBlcm1pc3Npb25Db2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFBlcm1pc3Npb24+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0PE9jYy5QZXJtaXNzaW9uPih0aGlzLmdldFBlcm1pc3Npb25FbmRwb2ludCh1c2VySWQsIHBlcm1pc3Npb25Db2RlKSlcbiAgICAgIC5waXBlKHRoaXMuY29udmVydGVyLnBpcGVhYmxlKFBFUk1JU1NJT05fTk9STUFMSVpFUikpO1xuICB9XG5cbiAgbG9hZExpc3QoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgcGFyYW1zPzogU2VhcmNoQ29uZmlnXG4gICk6IE9ic2VydmFibGU8RW50aXRpZXNNb2RlbDxQZXJtaXNzaW9uPj4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQ8T2NjLlBlcm1pc3Npb25zTGlzdD4odGhpcy5nZXRQZXJtaXNzaW9uc0VuZHBvaW50KHVzZXJJZCwgcGFyYW1zKSlcbiAgICAgIC5waXBlKHRoaXMuY29udmVydGVyLnBpcGVhYmxlKFBFUk1JU1NJT05TX05PUk1BTElaRVIpKTtcbiAgfVxuXG4gIGNyZWF0ZSh1c2VySWQ6IHN0cmluZywgcGVybWlzc2lvbjogUGVybWlzc2lvbik6IE9ic2VydmFibGU8UGVybWlzc2lvbj4ge1xuICAgIHBlcm1pc3Npb24gPSB0aGlzLmNvbnZlcnRlci5jb252ZXJ0KHBlcm1pc3Npb24sIFBFUk1JU1NJT05fU0VSSUFMSVpFUik7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3Q8T2NjLlBlcm1pc3Npb24+KHRoaXMuZ2V0UGVybWlzc2lvbnNFbmRwb2ludCh1c2VySWQpLCBwZXJtaXNzaW9uKVxuICAgICAgLnBpcGUodGhpcy5jb252ZXJ0ZXIucGlwZWFibGUoUEVSTUlTU0lPTl9OT1JNQUxJWkVSKSk7XG4gIH1cblxuICB1cGRhdGUoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgcGVybWlzc2lvbkNvZGU6IHN0cmluZyxcbiAgICBwZXJtaXNzaW9uOiBQZXJtaXNzaW9uXG4gICk6IE9ic2VydmFibGU8UGVybWlzc2lvbj4ge1xuICAgIHBlcm1pc3Npb24gPSB0aGlzLmNvbnZlcnRlci5jb252ZXJ0KHBlcm1pc3Npb24sIFBFUk1JU1NJT05fU0VSSUFMSVpFUik7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBhdGNoPE9jYy5QZXJtaXNzaW9uPihcbiAgICAgICAgdGhpcy5nZXRQZXJtaXNzaW9uRW5kcG9pbnQodXNlcklkLCBwZXJtaXNzaW9uQ29kZSksXG4gICAgICAgIHBlcm1pc3Npb25cbiAgICAgIClcbiAgICAgIC5waXBlKHRoaXMuY29udmVydGVyLnBpcGVhYmxlKFBFUk1JU1NJT05fTk9STUFMSVpFUikpO1xuICB9XG5cbiAgbG9hZFR5cGVzKCk6IE9ic2VydmFibGU8T3JkZXJBcHByb3ZhbFBlcm1pc3Npb25UeXBlW10+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0PE9jYy5PcmRlckFwcHJvdmFsUGVybWlzc2lvblR5cGVMaXN0PihcbiAgICAgICAgdGhpcy5nZXRQZXJtaXNzaW9uVHlwZXNFbmRwb2ludCgpXG4gICAgICApXG4gICAgICAucGlwZSh0aGlzLmNvbnZlcnRlci5waXBlYWJsZShQRVJNSVNTSU9OX1RZUEVTX05PUk1BTElaRVIpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRQZXJtaXNzaW9uRW5kcG9pbnQoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgb3JkZXJBcHByb3ZhbFBlcm1pc3Npb25Db2RlOiBzdHJpbmdcbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ3Blcm1pc3Npb24nLCB7XG4gICAgICB1cmxQYXJhbXM6IHtcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBvcmRlckFwcHJvdmFsUGVybWlzc2lvbkNvZGUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFBlcm1pc3Npb25zRW5kcG9pbnQoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgcGFyYW1zPzogU2VhcmNoQ29uZmlnXG4gICk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMub2NjRW5kcG9pbnRzLmJ1aWxkVXJsKCdwZXJtaXNzaW9ucycsIHtcbiAgICAgIHVybFBhcmFtczogeyB1c2VySWQgfSxcbiAgICAgIHF1ZXJ5UGFyYW1zOiBwYXJhbXMsXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0UGVybWlzc2lvblR5cGVzRW5kcG9pbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ29yZGVyQXBwcm92YWxQZXJtaXNzaW9uVHlwZXMnKTtcbiAgfVxufVxuIl19