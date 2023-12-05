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
export class OccPersonalizationIdInterceptor {
    constructor(config, occEndpoints, winRef) {
        this.config = config;
        this.occEndpoints = occEndpoints;
        this.winRef = winRef;
        this.enabled = false;
        this.PERSONALIZATION_ID_KEY = 'personalization-id';
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
                    this.config.personalization?.httpHeaderName?.id.toLowerCase();
                this.personalizationId = this.winRef.localStorage?.getItem(this.PERSONALIZATION_ID_KEY);
            }
            else if (this.winRef.localStorage?.getItem(this.PERSONALIZATION_ID_KEY)) {
                this.winRef.localStorage.removeItem(this.PERSONALIZATION_ID_KEY);
            }
        }
    }
    intercept(request, next) {
        if (!this.enabled) {
            return next.handle(request);
        }
        if (this.requestHeader &&
            this.personalizationId &&
            request.url.includes(this.occEndpoints.getBaseUrl())) {
            request = request.clone({
                setHeaders: {
                    [this.requestHeader]: this.personalizationId,
                },
            });
        }
        return next.handle(request).pipe(tap((event) => {
            if (event instanceof HttpResponse &&
                this.requestHeader &&
                event.headers.keys().includes(this.requestHeader)) {
                const receivedId = event.headers.get(this.requestHeader);
                if (this.personalizationId !== receivedId) {
                    this.personalizationId = receivedId;
                    if (this.personalizationId) {
                        this.winRef.localStorage?.setItem(this.PERSONALIZATION_ID_KEY, this.personalizationId);
                    }
                }
            }
        }));
    }
}
OccPersonalizationIdInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPersonalizationIdInterceptor, deps: [{ token: i1.PersonalizationConfig }, { token: i2.OccEndpointsService }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
OccPersonalizationIdInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPersonalizationIdInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPersonalizationIdInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.PersonalizationConfig }, { type: i2.OccEndpointsService }, { type: i2.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXBlcnNvbmFsaXphdGlvbi1pZC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy90cmFja2luZy9wZXJzb25hbGl6YXRpb24vcm9vdC9odHRwLWludGVyY2VwdG9ycy9vY2MtcGVyc29uYWxpemF0aW9uLWlkLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBS0wsWUFBWSxHQUNiLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQWtDLE1BQU0saUJBQWlCLENBQUM7QUFFaEYsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBSXJDLE1BQU0sT0FBTywrQkFBK0I7SUFRMUMsWUFDVSxNQUE2QixFQUM3QixZQUFpQyxFQUNqQyxNQUFpQjtRQUZqQixXQUFNLEdBQU4sTUFBTSxDQUF1QjtRQUM3QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQVJuQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ0wsMkJBQXNCLEdBQUcsb0JBQW9CLENBQUM7UUFFdkQsV0FBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQU92QyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE9BQU87Z0JBQ1YsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUM7b0JBQ2xFLEtBQUssQ0FBQztZQUVSLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLGNBQWMsSUFBSSxTQUFTLEVBQUUsRUFBRTtvQkFDL0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2QsMERBQTBELENBQzNELENBQUM7aUJBQ0g7Z0JBQ0QsSUFBSSxDQUFDLGFBQWE7b0JBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLGNBQWMsRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ2hFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQ3hELElBQUksQ0FBQyxzQkFBc0IsQ0FDNUIsQ0FBQzthQUNIO2lCQUFNLElBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUM5RDtnQkFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDbEU7U0FDRjtJQUNILENBQUM7SUFFRCxTQUFTLENBQ1AsT0FBeUIsRUFDekIsSUFBaUI7UUFFakIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdCO1FBRUQsSUFDRSxJQUFJLENBQUMsYUFBYTtZQUNsQixJQUFJLENBQUMsaUJBQWlCO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsRUFDcEQ7WUFDQSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDdEIsVUFBVSxFQUFFO29CQUNWLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksQ0FBQyxpQkFBaUI7aUJBQzdDO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUM5QixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNaLElBQ0UsS0FBSyxZQUFZLFlBQVk7Z0JBQzdCLElBQUksQ0FBQyxhQUFhO2dCQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQ2pEO2dCQUNBLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDekQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssVUFBVSxFQUFFO29CQUN6QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO29CQUNwQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTt3QkFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUMvQixJQUFJLENBQUMsc0JBQXNCLEVBQzNCLElBQUksQ0FBQyxpQkFBaUIsQ0FDdkIsQ0FBQztxQkFDSDtpQkFDRjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OzRIQTdFVSwrQkFBK0I7Z0lBQS9CLCtCQUErQixjQURsQixNQUFNOzJGQUNuQiwrQkFBK0I7a0JBRDNDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgSHR0cEV2ZW50LFxuICBIdHRwSGFuZGxlcixcbiAgSHR0cEludGVyY2VwdG9yLFxuICBIdHRwUmVxdWVzdCxcbiAgSHR0cFJlc3BvbnNlLFxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSwgT2NjRW5kcG9pbnRzU2VydmljZSwgV2luZG93UmVmIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFBlcnNvbmFsaXphdGlvbkNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9wZXJzb25hbGl6YXRpb24tY29uZmlnJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBPY2NQZXJzb25hbGl6YXRpb25JZEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgcHJpdmF0ZSBwZXJzb25hbGl6YXRpb25JZD86IHN0cmluZyB8IG51bGw7XG4gIHByaXZhdGUgcmVxdWVzdEhlYWRlcj86IHN0cmluZztcbiAgcHJpdmF0ZSBlbmFibGVkID0gZmFsc2U7XG4gIHByb3RlY3RlZCByZWFkb25seSBQRVJTT05BTElaQVRJT05fSURfS0VZID0gJ3BlcnNvbmFsaXphdGlvbi1pZCc7XG5cbiAgcHJvdGVjdGVkIGxvZ2dlciA9IGluamVjdChMb2dnZXJTZXJ2aWNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbmZpZzogUGVyc29uYWxpemF0aW9uQ29uZmlnLFxuICAgIHByaXZhdGUgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgd2luUmVmOiBXaW5kb3dSZWZcbiAgKSB7XG4gICAgaWYgKHRoaXMud2luUmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICB0aGlzLmVuYWJsZWQgPVxuICAgICAgICAodGhpcy53aW5SZWYubG9jYWxTdG9yYWdlICYmIHRoaXMuY29uZmlnLnBlcnNvbmFsaXphdGlvbj8uZW5hYmxlZCkgfHxcbiAgICAgICAgZmFsc2U7XG5cbiAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5wZXJzb25hbGl6YXRpb24/Lmh0dHBIZWFkZXJOYW1lICYmIGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2FybihcbiAgICAgICAgICAgIGBUaGVyZSBpcyBubyBodHRwSGVhZGVyTmFtZSBjb25maWd1cmVkIGluIFBlcnNvbmFsaXphdGlvbmBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVxdWVzdEhlYWRlciA9XG4gICAgICAgICAgdGhpcy5jb25maWcucGVyc29uYWxpemF0aW9uPy5odHRwSGVhZGVyTmFtZT8uaWQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5wZXJzb25hbGl6YXRpb25JZCA9IHRoaXMud2luUmVmLmxvY2FsU3RvcmFnZT8uZ2V0SXRlbShcbiAgICAgICAgICB0aGlzLlBFUlNPTkFMSVpBVElPTl9JRF9LRVlcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHRoaXMud2luUmVmLmxvY2FsU3RvcmFnZT8uZ2V0SXRlbSh0aGlzLlBFUlNPTkFMSVpBVElPTl9JRF9LRVkpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy53aW5SZWYubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5QRVJTT05BTElaQVRJT05fSURfS0VZKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbnRlcmNlcHQoXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnJlcXVlc3RIZWFkZXIgJiZcbiAgICAgIHRoaXMucGVyc29uYWxpemF0aW9uSWQgJiZcbiAgICAgIHJlcXVlc3QudXJsLmluY2x1ZGVzKHRoaXMub2NjRW5kcG9pbnRzLmdldEJhc2VVcmwoKSlcbiAgICApIHtcbiAgICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcbiAgICAgICAgc2V0SGVhZGVyczoge1xuICAgICAgICAgIFt0aGlzLnJlcXVlc3RIZWFkZXJdOiB0aGlzLnBlcnNvbmFsaXphdGlvbklkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpLnBpcGUoXG4gICAgICB0YXAoKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSAmJlxuICAgICAgICAgIHRoaXMucmVxdWVzdEhlYWRlciAmJlxuICAgICAgICAgIGV2ZW50LmhlYWRlcnMua2V5cygpLmluY2x1ZGVzKHRoaXMucmVxdWVzdEhlYWRlcilcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgcmVjZWl2ZWRJZCA9IGV2ZW50LmhlYWRlcnMuZ2V0KHRoaXMucmVxdWVzdEhlYWRlcik7XG4gICAgICAgICAgaWYgKHRoaXMucGVyc29uYWxpemF0aW9uSWQgIT09IHJlY2VpdmVkSWQpIHtcbiAgICAgICAgICAgIHRoaXMucGVyc29uYWxpemF0aW9uSWQgPSByZWNlaXZlZElkO1xuICAgICAgICAgICAgaWYgKHRoaXMucGVyc29uYWxpemF0aW9uSWQpIHtcbiAgICAgICAgICAgICAgdGhpcy53aW5SZWYubG9jYWxTdG9yYWdlPy5zZXRJdGVtKFxuICAgICAgICAgICAgICAgIHRoaXMuUEVSU09OQUxJWkFUSU9OX0lEX0tFWSxcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvbmFsaXphdGlvbklkXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==