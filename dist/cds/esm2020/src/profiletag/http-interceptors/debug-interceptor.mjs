import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/profiletag-event.service";
import * as i2 from "@spartacus/core";
export class DebugInterceptor {
    constructor(profileTagEventTracker, occEndpoints) {
        this.profileTagEventTracker = profileTagEventTracker;
        this.occEndpoints = occEndpoints;
    }
    intercept(request, next) {
        if (!this.isOccUrl(request.url)) {
            return next.handle(request);
        }
        const cdsHeaders = request.headers.set('X-Profile-Tag-Debug', this.profileTagEventTracker.profileTagDebug.toString());
        const cdsRequest = request.clone({ headers: cdsHeaders });
        return next.handle(cdsRequest);
    }
    isOccUrl(url) {
        return url.includes(this.occEndpoints.getBaseUrl());
    }
}
DebugInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DebugInterceptor, deps: [{ token: i1.ProfileTagEventService }, { token: i2.OccEndpointsService }], target: i0.ɵɵFactoryTarget.Injectable });
DebugInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DebugInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DebugInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ProfileTagEventService }, { type: i2.OccEndpointsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWctaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2Nkcy9zcmMvcHJvZmlsZXRhZy9odHRwLWludGVyY2VwdG9ycy9kZWJ1Zy1pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBTTNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsWUFDVSxzQkFBOEMsRUFDOUMsWUFBaUM7UUFEakMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5QyxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7SUFDeEMsQ0FBQztJQUNKLFNBQVMsQ0FDUCxPQUF5QixFQUN6QixJQUFpQjtRQUVqQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdCO1FBQ0QsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3BDLHFCQUFxQixFQUNyQixJQUFJLENBQUMsc0JBQXNCLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUN2RCxDQUFDO1FBQ0YsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzFELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU8sUUFBUSxDQUFDLEdBQVc7UUFDMUIsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDOzs2R0F0QlUsZ0JBQWdCO2lIQUFoQixnQkFBZ0IsY0FESCxNQUFNOzJGQUNuQixnQkFBZ0I7a0JBRDVCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgSHR0cEV2ZW50LFxuICBIdHRwSGFuZGxlcixcbiAgSHR0cEludGVyY2VwdG9yLFxuICBIdHRwUmVxdWVzdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2NjRW5kcG9pbnRzU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQcm9maWxlVGFnRXZlbnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcHJvZmlsZXRhZy1ldmVudC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBEZWJ1Z0ludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwcm9maWxlVGFnRXZlbnRUcmFja2VyOiBQcm9maWxlVGFnRXZlbnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlXG4gICkge31cbiAgaW50ZXJjZXB0KFxuICAgIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgbmV4dDogSHR0cEhhbmRsZXJcbiAgKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGlmICghdGhpcy5pc09jY1VybChyZXF1ZXN0LnVybCkpIHtcbiAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KTtcbiAgICB9XG4gICAgY29uc3QgY2RzSGVhZGVycyA9IHJlcXVlc3QuaGVhZGVycy5zZXQoXG4gICAgICAnWC1Qcm9maWxlLVRhZy1EZWJ1ZycsXG4gICAgICB0aGlzLnByb2ZpbGVUYWdFdmVudFRyYWNrZXIucHJvZmlsZVRhZ0RlYnVnLnRvU3RyaW5nKClcbiAgICApO1xuICAgIGNvbnN0IGNkc1JlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHsgaGVhZGVyczogY2RzSGVhZGVycyB9KTtcbiAgICByZXR1cm4gbmV4dC5oYW5kbGUoY2RzUmVxdWVzdCk7XG4gIH1cblxuICBwcml2YXRlIGlzT2NjVXJsKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHVybC5pbmNsdWRlcyh0aGlzLm9jY0VuZHBvaW50cy5nZXRCYXNlVXJsKCkpO1xuICB9XG59XG4iXX0=