import { Injectable, inject, isDevMode } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "../config/segment-refs-config";
import * as i2 from "@spartacus/core";
export class OccSegmentRefsInterceptor {
    constructor(config, occEndpoints, winRef) {
        this.config = config;
        this.occEndpoints = occEndpoints;
        this.winRef = winRef;
        this.SEGMENT_REFS_KEY = 'segment-refs';
        this.SEGMENT_REFS_QUERY_PARAM = 'segmentrefs';
        this.logger = inject(LoggerService);
        this.initialize();
    }
    /**
     * Fetched the segment reference ID from URL query parameter and saves it into
     * browser local storage
     */
    initialize() {
        const url = this.winRef.location.href ?? '';
        const queryParams = new URLSearchParams(url.substring(url.indexOf('?')));
        this.segmentRefs = queryParams.get(this.SEGMENT_REFS_QUERY_PARAM);
        if (this.segmentRefs) {
            this.winRef.localStorage?.setItem(this.SEGMENT_REFS_KEY, this.segmentRefs);
        }
        else {
            this.segmentRefs = this.winRef.localStorage?.getItem(this.SEGMENT_REFS_KEY);
        }
        if (this.winRef.isBrowser()) {
            if (!this.config.segmentRefs?.httpHeaderName && isDevMode()) {
                this.logger.warn(`There is no httpHeaderName configured in Segment`);
            }
            this.requestHeader =
                this.config.segmentRefs?.httpHeaderName?.toLowerCase?.();
        }
    }
    /**
     * Adds a new request header 'Segmentrefs' to the given HTTP request.
     * @param request The outgoing request object to handle.
     * @param next The next interceptor in the chain, or the backend
     * if no interceptors remain in the chain.
     * @returns An observable of the event stream.
     */
    intercept(request, next) {
        if (this.winRef.isBrowser() &&
            this.requestHeader &&
            this.segmentRefs &&
            request.url.includes(this.occEndpoints.getBaseUrl())) {
            request = request.clone({
                setHeaders: {
                    [this.requestHeader]: this.segmentRefs,
                },
            });
        }
        return next.handle(request);
    }
}
OccSegmentRefsInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccSegmentRefsInterceptor, deps: [{ token: i1.SegmentRefsConfig }, { token: i2.OccEndpointsService }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
OccSegmentRefsInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccSegmentRefsInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccSegmentRefsInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.SegmentRefsConfig }, { type: i2.OccEndpointsService }, { type: i2.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXNlZ21lbnQtcmVmcy5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvc2VnbWVudC1yZWZzL3Jvb3QvaHR0cC1pbnRlcmNlcHRvcnMvb2NjLXNlZ21lbnQtcmVmcy5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLGFBQWEsRUFBa0MsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUloRixNQUFNLE9BQU8seUJBQXlCO0lBUXBDLFlBQ1ksTUFBeUIsRUFDekIsWUFBaUMsRUFDakMsTUFBaUI7UUFGakIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFSVixxQkFBZ0IsR0FBRyxjQUFjLENBQUM7UUFDbEMsNkJBQXdCLEdBQUcsYUFBYSxDQUFDO1FBRWxELFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFPdkMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7O09BR0c7SUFDTyxVQUFVO1FBQ2xCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDNUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDbEUsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FDL0IsSUFBSSxDQUFDLGdCQUFnQixFQUNyQixJQUFJLENBQUMsV0FBVyxDQUNqQixDQUFDO1NBQ0g7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUNsRCxJQUFJLENBQUMsZ0JBQWdCLENBQ3RCLENBQUM7U0FDSDtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsY0FBYyxJQUFJLFNBQVMsRUFBRSxFQUFFO2dCQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO2FBQ3RFO1lBQ0QsSUFBSSxDQUFDLGFBQWE7Z0JBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDO1NBQzVEO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFNBQVMsQ0FDUCxPQUF5QixFQUN6QixJQUFpQjtRQUVqQixJQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhO1lBQ2xCLElBQUksQ0FBQyxXQUFXO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsRUFDcEQ7WUFDQSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDdEIsVUFBVSxFQUFFO29CQUNWLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXO2lCQUN2QzthQUNGLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7O3NIQW5FVSx5QkFBeUI7MEhBQXpCLHlCQUF5QixjQURaLE1BQU07MkZBQ25CLHlCQUF5QjtrQkFEckMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBIdHRwRXZlbnQsXG4gIEh0dHBIYW5kbGVyLFxuICBIdHRwSW50ZXJjZXB0b3IsXG4gIEh0dHBSZXF1ZXN0LFxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSwgT2NjRW5kcG9pbnRzU2VydmljZSwgV2luZG93UmVmIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFNlZ21lbnRSZWZzQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL3NlZ21lbnQtcmVmcy1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE9jY1NlZ21lbnRSZWZzSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBwcml2YXRlIHNlZ21lbnRSZWZzPzogc3RyaW5nIHwgbnVsbDtcbiAgcHJpdmF0ZSByZXF1ZXN0SGVhZGVyPzogc3RyaW5nO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgU0VHTUVOVF9SRUZTX0tFWSA9ICdzZWdtZW50LXJlZnMnO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgU0VHTUVOVF9SRUZTX1FVRVJZX1BBUkFNID0gJ3NlZ21lbnRyZWZzJztcblxuICBwcm90ZWN0ZWQgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb25maWc6IFNlZ21lbnRSZWZzQ29uZmlnLFxuICAgIHByb3RlY3RlZCBvY2NFbmRwb2ludHM6IE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHdpblJlZjogV2luZG93UmVmXG4gICkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoZWQgdGhlIHNlZ21lbnQgcmVmZXJlbmNlIElEIGZyb20gVVJMIHF1ZXJ5IHBhcmFtZXRlciBhbmQgc2F2ZXMgaXQgaW50b1xuICAgKiBicm93c2VyIGxvY2FsIHN0b3JhZ2VcbiAgICovXG4gIHByb3RlY3RlZCBpbml0aWFsaXplKCkge1xuICAgIGNvbnN0IHVybCA9IHRoaXMud2luUmVmLmxvY2F0aW9uLmhyZWYgPz8gJyc7XG4gICAgY29uc3QgcXVlcnlQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHVybC5zdWJzdHJpbmcodXJsLmluZGV4T2YoJz8nKSkpO1xuICAgIHRoaXMuc2VnbWVudFJlZnMgPSBxdWVyeVBhcmFtcy5nZXQodGhpcy5TRUdNRU5UX1JFRlNfUVVFUllfUEFSQU0pO1xuICAgIGlmICh0aGlzLnNlZ21lbnRSZWZzKSB7XG4gICAgICB0aGlzLndpblJlZi5sb2NhbFN0b3JhZ2U/LnNldEl0ZW0oXG4gICAgICAgIHRoaXMuU0VHTUVOVF9SRUZTX0tFWSxcbiAgICAgICAgdGhpcy5zZWdtZW50UmVmc1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWdtZW50UmVmcyA9IHRoaXMud2luUmVmLmxvY2FsU3RvcmFnZT8uZ2V0SXRlbShcbiAgICAgICAgdGhpcy5TRUdNRU5UX1JFRlNfS0VZXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy53aW5SZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIGlmICghdGhpcy5jb25maWcuc2VnbWVudFJlZnM/Lmh0dHBIZWFkZXJOYW1lICYmIGlzRGV2TW9kZSgpKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYFRoZXJlIGlzIG5vIGh0dHBIZWFkZXJOYW1lIGNvbmZpZ3VyZWQgaW4gU2VnbWVudGApO1xuICAgICAgfVxuICAgICAgdGhpcy5yZXF1ZXN0SGVhZGVyID1cbiAgICAgICAgdGhpcy5jb25maWcuc2VnbWVudFJlZnM/Lmh0dHBIZWFkZXJOYW1lPy50b0xvd2VyQ2FzZT8uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBuZXcgcmVxdWVzdCBoZWFkZXIgJ1NlZ21lbnRyZWZzJyB0byB0aGUgZ2l2ZW4gSFRUUCByZXF1ZXN0LlxuICAgKiBAcGFyYW0gcmVxdWVzdCBUaGUgb3V0Z29pbmcgcmVxdWVzdCBvYmplY3QgdG8gaGFuZGxlLlxuICAgKiBAcGFyYW0gbmV4dCBUaGUgbmV4dCBpbnRlcmNlcHRvciBpbiB0aGUgY2hhaW4sIG9yIHRoZSBiYWNrZW5kXG4gICAqIGlmIG5vIGludGVyY2VwdG9ycyByZW1haW4gaW4gdGhlIGNoYWluLlxuICAgKiBAcmV0dXJucyBBbiBvYnNlcnZhYmxlIG9mIHRoZSBldmVudCBzdHJlYW0uXG4gICAqL1xuICBpbnRlcmNlcHQoXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgaWYgKFxuICAgICAgdGhpcy53aW5SZWYuaXNCcm93c2VyKCkgJiZcbiAgICAgIHRoaXMucmVxdWVzdEhlYWRlciAmJlxuICAgICAgdGhpcy5zZWdtZW50UmVmcyAmJlxuICAgICAgcmVxdWVzdC51cmwuaW5jbHVkZXModGhpcy5vY2NFbmRwb2ludHMuZ2V0QmFzZVVybCgpKVxuICAgICkge1xuICAgICAgcmVxdWVzdCA9IHJlcXVlc3QuY2xvbmUoe1xuICAgICAgICBzZXRIZWFkZXJzOiB7XG4gICAgICAgICAgW3RoaXMucmVxdWVzdEhlYWRlcl06IHRoaXMuc2VnbWVudFJlZnMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpO1xuICB9XG59XG4iXX0=