import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../config/occ-config";
/**
 * Http interceptor to add cookies to all cross-site requests.
 */
export class WithCredentialsInterceptor {
    constructor(config) {
        this.config = config;
    }
    /**
     * Intercepts each request and adds the `withCredential` flag to it
     * if it hasn't been added already.
     */
    intercept(request, next) {
        if (this.requiresWithCredentials(request)) {
            request = request.clone({
                withCredentials: true,
            });
        }
        return next.handle(request);
    }
    /**
     * indicates whether the request should use the WithCredentials flag.
     */
    requiresWithCredentials(request) {
        return (this.occConfig?.useWithCredentials !== undefined &&
            request.url.indexOf(this.occConfig?.prefix ?? '') > -1);
    }
    get occConfig() {
        return this.config.backend?.occ;
    }
}
WithCredentialsInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WithCredentialsInterceptor, deps: [{ token: i1.OccConfig }], target: i0.ɵɵFactoryTarget.Injectable });
WithCredentialsInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WithCredentialsInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WithCredentialsInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.OccConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aC1jcmVkZW50aWFscy5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL29jYy9pbnRlcmNlcHRvcnMvd2l0aC1jcmVkZW50aWFscy5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFJM0M7O0dBRUc7QUFFSCxNQUFNLE9BQU8sMEJBQTBCO0lBQ3JDLFlBQXNCLE1BQWlCO1FBQWpCLFdBQU0sR0FBTixNQUFNLENBQVc7SUFBRyxDQUFDO0lBRTNDOzs7T0FHRztJQUNILFNBQVMsQ0FDUCxPQUF5QixFQUN6QixJQUFpQjtRQUVqQixJQUFJLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN6QyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDdEIsZUFBZSxFQUFFLElBQUk7YUFDdEIsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVEOztPQUVHO0lBQ08sdUJBQXVCLENBQUMsT0FBeUI7UUFDekQsT0FBTyxDQUNMLElBQUksQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLEtBQUssU0FBUztZQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDdkQsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFZLFNBQVM7UUFDbkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7SUFDbEMsQ0FBQzs7dUhBL0JVLDBCQUEwQjsySEFBMUIsMEJBQTBCLGNBRGIsTUFBTTsyRkFDbkIsMEJBQTBCO2tCQUR0QyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIEh0dHBFdmVudCxcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBJbnRlcmNlcHRvcixcbiAgSHR0cFJlcXVlc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9jY0NvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9vY2MtY29uZmlnJztcblxuLyoqXG4gKiBIdHRwIGludGVyY2VwdG9yIHRvIGFkZCBjb29raWVzIHRvIGFsbCBjcm9zcy1zaXRlIHJlcXVlc3RzLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFdpdGhDcmVkZW50aWFsc0ludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvbmZpZzogT2NjQ29uZmlnKSB7fVxuXG4gIC8qKlxuICAgKiBJbnRlcmNlcHRzIGVhY2ggcmVxdWVzdCBhbmQgYWRkcyB0aGUgYHdpdGhDcmVkZW50aWFsYCBmbGFnIHRvIGl0XG4gICAqIGlmIGl0IGhhc24ndCBiZWVuIGFkZGVkIGFscmVhZHkuXG4gICAqL1xuICBpbnRlcmNlcHQoXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgaWYgKHRoaXMucmVxdWlyZXNXaXRoQ3JlZGVudGlhbHMocmVxdWVzdCkpIHtcbiAgICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBpbmRpY2F0ZXMgd2hldGhlciB0aGUgcmVxdWVzdCBzaG91bGQgdXNlIHRoZSBXaXRoQ3JlZGVudGlhbHMgZmxhZy5cbiAgICovXG4gIHByb3RlY3RlZCByZXF1aXJlc1dpdGhDcmVkZW50aWFscyhyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMub2NjQ29uZmlnPy51c2VXaXRoQ3JlZGVudGlhbHMgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgcmVxdWVzdC51cmwuaW5kZXhPZih0aGlzLm9jY0NvbmZpZz8ucHJlZml4ID8/ICcnKSA+IC0xXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IG9jY0NvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuYmFja2VuZD8ub2NjO1xuICB9XG59XG4iXX0=