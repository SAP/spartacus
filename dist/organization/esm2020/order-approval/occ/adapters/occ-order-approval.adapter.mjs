import { Injectable } from '@angular/core';
import { ORDER_APPROVALS_NORMALIZER, ORDER_APPROVAL_DECISION_NORMALIZER, ORDER_APPROVAL_NORMALIZER, } from '../../core/connectors/converters';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccOrderApprovalAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    load(userId, orderApprovalCode) {
        return this.http
            .get(this.getOrderApprovalEndpoint(userId, orderApprovalCode))
            .pipe(this.converter.pipeable(ORDER_APPROVAL_NORMALIZER));
    }
    loadList(userId, params) {
        return this.http
            .get(this.getOrderApprovalsEndpoint(userId, params))
            .pipe(this.converter.pipeable(ORDER_APPROVALS_NORMALIZER));
    }
    makeDecision(userId, orderApprovalCode, orderApprovalDecision) {
        return this.http
            .post(this.getOrderApprovalDecisionEndpoint(userId, orderApprovalCode), orderApprovalDecision)
            .pipe(this.converter.pipeable(ORDER_APPROVAL_DECISION_NORMALIZER));
    }
    getOrderApprovalEndpoint(userId, orderApprovalCode) {
        return this.occEndpoints.buildUrl('orderApproval', {
            urlParams: {
                userId,
                orderApprovalCode,
            },
        });
    }
    getOrderApprovalsEndpoint(userId, params) {
        return this.occEndpoints.buildUrl('orderApprovals', {
            urlParams: { userId },
            queryParams: params,
        });
    }
    getOrderApprovalDecisionEndpoint(userId, orderApprovalCode) {
        return this.occEndpoints.buildUrl('orderApprovalDecision', {
            urlParams: {
                userId,
                orderApprovalCode,
            },
        });
    }
}
OccOrderApprovalAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccOrderApprovalAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderApprovalAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLW9yZGVyLWFwcHJvdmFsLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL29yZGVyLWFwcHJvdmFsL29jYy9hZGFwdGVycy9vY2Mtb3JkZXItYXBwcm92YWwuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBYTNDLE9BQU8sRUFDTCwwQkFBMEIsRUFDMUIsa0NBQWtDLEVBQ2xDLHlCQUF5QixHQUMxQixNQUFNLGtDQUFrQyxDQUFDOzs7O0FBSTFDLE1BQU0sT0FBTyx1QkFBdUI7SUFDbEMsWUFDWSxJQUFnQixFQUNoQixZQUFpQyxFQUNqQyxTQUEyQjtRQUYzQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtJQUNwQyxDQUFDO0lBRUosSUFBSSxDQUFDLE1BQWMsRUFBRSxpQkFBeUI7UUFDNUMsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FDRixJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQ3pEO2FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsUUFBUSxDQUNOLE1BQWMsRUFDZCxNQUFxQjtRQUVyQixPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUNGLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQy9DO2FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsWUFBWSxDQUNWLE1BQWMsRUFDZCxpQkFBeUIsRUFDekIscUJBQTRDO1FBRTVDLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQ0gsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxFQUNoRSxxQkFBcUIsQ0FDdEI7YUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFUyx3QkFBd0IsQ0FDaEMsTUFBYyxFQUNkLGlCQUF5QjtRQUV6QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRTtZQUNqRCxTQUFTLEVBQUU7Z0JBQ1QsTUFBTTtnQkFDTixpQkFBaUI7YUFDbEI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMseUJBQXlCLENBQ2pDLE1BQWMsRUFDZCxNQUFxQjtRQUVyQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFO1lBQ2xELFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRTtZQUNyQixXQUFXLEVBQUUsTUFBTTtTQUNwQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsZ0NBQWdDLENBQ3hDLE1BQWMsRUFDZCxpQkFBeUI7UUFFekIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtZQUN6RCxTQUFTLEVBQUU7Z0JBQ1QsTUFBTTtnQkFDTixpQkFBaUI7YUFDbEI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOztvSEF2RVUsdUJBQXVCO3dIQUF2Qix1QkFBdUI7MkZBQXZCLHVCQUF1QjtrQkFEbkMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb252ZXJ0ZXJTZXJ2aWNlLFxuICBFbnRpdGllc01vZGVsLFxuICBPY2MsXG4gIE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gIFNlYXJjaENvbmZpZyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIE9yZGVyQXBwcm92YWwsXG4gIE9yZGVyQXBwcm92YWxEZWNpc2lvbixcbn0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbC9vcmRlci1hcHByb3ZhbC5tb2RlbCc7XG5pbXBvcnQgeyBPcmRlckFwcHJvdmFsQWRhcHRlciB9IGZyb20gJy4uLy4uL2NvcmUvY29ubmVjdG9ycy9vcmRlci1hcHByb3ZhbC5hZGFwdGVyJztcbmltcG9ydCB7XG4gIE9SREVSX0FQUFJPVkFMU19OT1JNQUxJWkVSLFxuICBPUkRFUl9BUFBST1ZBTF9ERUNJU0lPTl9OT1JNQUxJWkVSLFxuICBPUkRFUl9BUFBST1ZBTF9OT1JNQUxJWkVSLFxufSBmcm9tICcuLi8uLi9jb3JlL2Nvbm5lY3RvcnMvY29udmVydGVycyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NPcmRlckFwcHJvdmFsQWRhcHRlciBpbXBsZW1lbnRzIE9yZGVyQXBwcm92YWxBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJvdGVjdGVkIG9jY0VuZHBvaW50czogT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29udmVydGVyOiBDb252ZXJ0ZXJTZXJ2aWNlXG4gICkge31cblxuICBsb2FkKHVzZXJJZDogc3RyaW5nLCBvcmRlckFwcHJvdmFsQ29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxPcmRlckFwcHJvdmFsPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldDxPY2MuT3JkZXJBcHByb3ZhbD4oXG4gICAgICAgIHRoaXMuZ2V0T3JkZXJBcHByb3ZhbEVuZHBvaW50KHVzZXJJZCwgb3JkZXJBcHByb3ZhbENvZGUpXG4gICAgICApXG4gICAgICAucGlwZSh0aGlzLmNvbnZlcnRlci5waXBlYWJsZShPUkRFUl9BUFBST1ZBTF9OT1JNQUxJWkVSKSk7XG4gIH1cblxuICBsb2FkTGlzdChcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBwYXJhbXM/OiBTZWFyY2hDb25maWdcbiAgKTogT2JzZXJ2YWJsZTxFbnRpdGllc01vZGVsPE9yZGVyQXBwcm92YWw+PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldDxPY2MuT3JkZXJBcHByb3ZhbHNMaXN0PihcbiAgICAgICAgdGhpcy5nZXRPcmRlckFwcHJvdmFsc0VuZHBvaW50KHVzZXJJZCwgcGFyYW1zKVxuICAgICAgKVxuICAgICAgLnBpcGUodGhpcy5jb252ZXJ0ZXIucGlwZWFibGUoT1JERVJfQVBQUk9WQUxTX05PUk1BTElaRVIpKTtcbiAgfVxuXG4gIG1ha2VEZWNpc2lvbihcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBvcmRlckFwcHJvdmFsQ29kZTogc3RyaW5nLFxuICAgIG9yZGVyQXBwcm92YWxEZWNpc2lvbjogT3JkZXJBcHByb3ZhbERlY2lzaW9uXG4gICk6IE9ic2VydmFibGU8T3JkZXJBcHByb3ZhbERlY2lzaW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3Q8T2NjLk9yZGVyQXBwcm92YWw+KFxuICAgICAgICB0aGlzLmdldE9yZGVyQXBwcm92YWxEZWNpc2lvbkVuZHBvaW50KHVzZXJJZCwgb3JkZXJBcHByb3ZhbENvZGUpLFxuICAgICAgICBvcmRlckFwcHJvdmFsRGVjaXNpb25cbiAgICAgIClcbiAgICAgIC5waXBlKHRoaXMuY29udmVydGVyLnBpcGVhYmxlKE9SREVSX0FQUFJPVkFMX0RFQ0lTSU9OX05PUk1BTElaRVIpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRPcmRlckFwcHJvdmFsRW5kcG9pbnQoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgb3JkZXJBcHByb3ZhbENvZGU6IHN0cmluZ1xuICApOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgnb3JkZXJBcHByb3ZhbCcsIHtcbiAgICAgIHVybFBhcmFtczoge1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIG9yZGVyQXBwcm92YWxDb2RlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRPcmRlckFwcHJvdmFsc0VuZHBvaW50KFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIHBhcmFtcz86IFNlYXJjaENvbmZpZ1xuICApOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgnb3JkZXJBcHByb3ZhbHMnLCB7XG4gICAgICB1cmxQYXJhbXM6IHsgdXNlcklkIH0sXG4gICAgICBxdWVyeVBhcmFtczogcGFyYW1zLFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldE9yZGVyQXBwcm92YWxEZWNpc2lvbkVuZHBvaW50KFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIG9yZGVyQXBwcm92YWxDb2RlOiBzdHJpbmdcbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ29yZGVyQXBwcm92YWxEZWNpc2lvbicsIHtcbiAgICAgIHVybFBhcmFtczoge1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIG9yZGVyQXBwcm92YWxDb2RlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuIl19