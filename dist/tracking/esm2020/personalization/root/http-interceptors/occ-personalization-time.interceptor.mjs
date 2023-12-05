/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpResponse, } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../config/personalization-config";
import * as i2 from "@spartacus/core";
export class OccPersonalizationTimeInterceptor {
    constructor(config, occEndpoints, winRef) {
        this.config = config;
        this.occEndpoints = occEndpoints;
        this.winRef = winRef;
        this.enabled = false;
        this.PERSONALIZATION_TIME_KEY = 'personalization-time';
        this.logger = inject(LoggerService);
        if (this.winRef.isBrowser()) {
            this.enabled =
                (this.winRef.localStorage && this.config.personalization?.enabled) ||
                    false;
            if (this.enabled) {
                if (!this.config.personalization?.httpHeaderName && isDevMode()) {
                    this.logger.warn(`There is no httpHeaderName configured in Personalization`);
                }
                this.requestHeader =
                    this.config.personalization?.httpHeaderName?.timestamp.toLowerCase();
                this.timestamp = this.winRef.localStorage?.getItem(this.PERSONALIZATION_TIME_KEY);
            }
            else if (this.winRef.localStorage?.getItem(this.PERSONALIZATION_TIME_KEY)) {
                this.winRef.localStorage.removeItem(this.PERSONALIZATION_TIME_KEY);
            }
        }
    }
    intercept(request, next) {
        if (!this.enabled) {
            return next.handle(request);
        }
        if (this.requestHeader &&
            this.timestamp &&
            request.url.includes(this.occEndpoints.getBaseUrl())) {
            request = request.clone({
                setHeaders: {
                    [this.requestHeader]: this.timestamp,
                },
            });
        }
        return next.handle(request).pipe(tap((event) => {
            if (event instanceof HttpResponse &&
                this.requestHeader &&
                event.headers.keys().includes(this.requestHeader)) {
                const receivedTimestamp = event.headers.get(this.requestHeader);
                if (this.timestamp !== receivedTimestamp) {
                    this.timestamp = receivedTimestamp;
                    if (this.timestamp) {
                        this.winRef.localStorage?.setItem(this.PERSONALIZATION_TIME_KEY, this.timestamp);
                    }
                }
            }
        }));
    }
}
OccPersonalizationTimeInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPersonalizationTimeInterceptor, deps: [{ token: i1.PersonalizationConfig }, { token: i2.OccEndpointsService }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
OccPersonalizationTimeInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPersonalizationTimeInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPersonalizationTimeInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.PersonalizationConfig }, { type: i2.OccEndpointsService }, { type: i2.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXBlcnNvbmFsaXphdGlvbi10aW1lLmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3RyYWNraW5nL3BlcnNvbmFsaXphdGlvbi9yb290L2h0dHAtaW50ZXJjZXB0b3JzL29jYy1wZXJzb25hbGl6YXRpb24tdGltZS5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUtMLFlBQVksR0FDYixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFrQyxNQUFNLGlCQUFpQixDQUFDO0FBRWhGLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUlyQyxNQUFNLE9BQU8saUNBQWlDO0lBUTVDLFlBQ1UsTUFBNkIsRUFDN0IsWUFBaUMsRUFDakMsTUFBaUI7UUFGakIsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7UUFDN0IsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFSbkIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNMLDZCQUF3QixHQUFHLHNCQUFzQixDQUFDO1FBRTNELFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFPdkMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzNCLElBQUksQ0FBQyxPQUFPO2dCQUNWLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDO29CQUNsRSxLQUFLLENBQUM7WUFFUixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxjQUFjLElBQUksU0FBUyxFQUFFLEVBQUU7b0JBQy9ELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNkLDBEQUEwRCxDQUMzRCxDQUFDO2lCQUNIO2dCQUNELElBQUksQ0FBQyxhQUFhO29CQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN2RSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FDaEQsSUFBSSxDQUFDLHdCQUF3QixDQUM5QixDQUFDO2FBQ0g7aUJBQU0sSUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEVBQ2hFO2dCQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUNwRTtTQUNGO0lBQ0gsQ0FBQztJQUVELFNBQVMsQ0FDUCxPQUF5QixFQUN6QixJQUFpQjtRQUVqQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0I7UUFFRCxJQUNFLElBQUksQ0FBQyxhQUFhO1lBQ2xCLElBQUksQ0FBQyxTQUFTO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUNwRDtZQUNBLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUN0QixVQUFVLEVBQUU7b0JBQ1YsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVM7aUJBQ3JDO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUM5QixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNaLElBQ0UsS0FBSyxZQUFZLFlBQVk7Z0JBQzdCLElBQUksQ0FBQyxhQUFhO2dCQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQ2pEO2dCQUNBLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssaUJBQWlCLEVBQUU7b0JBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUM7b0JBQ25DLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTt3QkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUMvQixJQUFJLENBQUMsd0JBQXdCLEVBQzdCLElBQUksQ0FBQyxTQUFTLENBQ2YsQ0FBQztxQkFDSDtpQkFDRjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OzhIQTdFVSxpQ0FBaUM7a0lBQWpDLGlDQUFpQyxjQURwQixNQUFNOzJGQUNuQixpQ0FBaUM7a0JBRDdDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgSHR0cEV2ZW50LFxuICBIdHRwSGFuZGxlcixcbiAgSHR0cEludGVyY2VwdG9yLFxuICBIdHRwUmVxdWVzdCxcbiAgSHR0cFJlc3BvbnNlLFxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSwgT2NjRW5kcG9pbnRzU2VydmljZSwgV2luZG93UmVmIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFBlcnNvbmFsaXphdGlvbkNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9wZXJzb25hbGl6YXRpb24tY29uZmlnJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBPY2NQZXJzb25hbGl6YXRpb25UaW1lSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBwcml2YXRlIHRpbWVzdGFtcD86IHN0cmluZyB8IG51bGw7XG4gIHByaXZhdGUgcmVxdWVzdEhlYWRlcj86IHN0cmluZztcbiAgcHJpdmF0ZSBlbmFibGVkID0gZmFsc2U7XG4gIHByb3RlY3RlZCByZWFkb25seSBQRVJTT05BTElaQVRJT05fVElNRV9LRVkgPSAncGVyc29uYWxpemF0aW9uLXRpbWUnO1xuXG4gIHByb3RlY3RlZCBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWc6IFBlcnNvbmFsaXphdGlvbkNvbmZpZyxcbiAgICBwcml2YXRlIG9jY0VuZHBvaW50czogT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgICBwcml2YXRlIHdpblJlZjogV2luZG93UmVmXG4gICkge1xuICAgIGlmICh0aGlzLndpblJlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgdGhpcy5lbmFibGVkID1cbiAgICAgICAgKHRoaXMud2luUmVmLmxvY2FsU3RvcmFnZSAmJiB0aGlzLmNvbmZpZy5wZXJzb25hbGl6YXRpb24/LmVuYWJsZWQpIHx8XG4gICAgICAgIGZhbHNlO1xuXG4gICAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcucGVyc29uYWxpemF0aW9uPy5odHRwSGVhZGVyTmFtZSAmJiBpc0Rldk1vZGUoKSkge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXG4gICAgICAgICAgICBgVGhlcmUgaXMgbm8gaHR0cEhlYWRlck5hbWUgY29uZmlndXJlZCBpbiBQZXJzb25hbGl6YXRpb25gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlcXVlc3RIZWFkZXIgPVxuICAgICAgICAgIHRoaXMuY29uZmlnLnBlcnNvbmFsaXphdGlvbj8uaHR0cEhlYWRlck5hbWU/LnRpbWVzdGFtcC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHRoaXMud2luUmVmLmxvY2FsU3RvcmFnZT8uZ2V0SXRlbShcbiAgICAgICAgICB0aGlzLlBFUlNPTkFMSVpBVElPTl9USU1FX0tFWVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdGhpcy53aW5SZWYubG9jYWxTdG9yYWdlPy5nZXRJdGVtKHRoaXMuUEVSU09OQUxJWkFUSU9OX1RJTUVfS0VZKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMud2luUmVmLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuUEVSU09OQUxJWkFUSU9OX1RJTUVfS0VZKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbnRlcmNlcHQoXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnJlcXVlc3RIZWFkZXIgJiZcbiAgICAgIHRoaXMudGltZXN0YW1wICYmXG4gICAgICByZXF1ZXN0LnVybC5pbmNsdWRlcyh0aGlzLm9jY0VuZHBvaW50cy5nZXRCYXNlVXJsKCkpXG4gICAgKSB7XG4gICAgICByZXF1ZXN0ID0gcmVxdWVzdC5jbG9uZSh7XG4gICAgICAgIHNldEhlYWRlcnM6IHtcbiAgICAgICAgICBbdGhpcy5yZXF1ZXN0SGVhZGVyXTogdGhpcy50aW1lc3RhbXAsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdCkucGlwZShcbiAgICAgIHRhcCgoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlICYmXG4gICAgICAgICAgdGhpcy5yZXF1ZXN0SGVhZGVyICYmXG4gICAgICAgICAgZXZlbnQuaGVhZGVycy5rZXlzKCkuaW5jbHVkZXModGhpcy5yZXF1ZXN0SGVhZGVyKVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCByZWNlaXZlZFRpbWVzdGFtcCA9IGV2ZW50LmhlYWRlcnMuZ2V0KHRoaXMucmVxdWVzdEhlYWRlcik7XG4gICAgICAgICAgaWYgKHRoaXMudGltZXN0YW1wICE9PSByZWNlaXZlZFRpbWVzdGFtcCkge1xuICAgICAgICAgICAgdGhpcy50aW1lc3RhbXAgPSByZWNlaXZlZFRpbWVzdGFtcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVzdGFtcCkge1xuICAgICAgICAgICAgICB0aGlzLndpblJlZi5sb2NhbFN0b3JhZ2U/LnNldEl0ZW0oXG4gICAgICAgICAgICAgICAgdGhpcy5QRVJTT05BTElaQVRJT05fVElNRV9LRVksXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lc3RhbXBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuXG4vLyBDSEVDSyBTT05BUlxuIl19