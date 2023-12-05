import { Inject, Injectable } from '@angular/core';
import { OCC_HTTP_TOKEN, OCC_USER_ID_CONSTANTS, } from '@spartacus/core';
import { of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * Looks for a specific key in the HttpRequest's context (OCC_ASM_TOKEN) to decide when to
 * configure a request with 'sap-commerce-cloud-user-id' header.
 */
export class UserIdHttpHeaderInterceptor {
    constructor(config, userIdService, userIdConstants) {
        this.config = config;
        this.userIdService = userIdService;
        this.userIdConstants = userIdConstants;
        this.userIdHeader = 'sap-commerce-cloud-user-id';
        this.uniqueUserIdConstants = new Set(Object.values(userIdConstants));
    }
    intercept(httpRequest, next) {
        // Casting as <AsmConfig> to avoid circular dependencies with @spartacus/asm/core.
        if (!this.config.asm?.userIdHttpHeader?.enable) {
            return next.handle(httpRequest);
        }
        const asmContext = httpRequest.context.get(OCC_HTTP_TOKEN);
        let userIdObservable;
        if (typeof asmContext.sendUserIdAsHeader === 'string') {
            userIdObservable = of(asmContext.sendUserIdAsHeader);
        }
        else if (asmContext.sendUserIdAsHeader) {
            userIdObservable = this.userIdService
                .takeUserId()
                .pipe(map((userId) => this.uniqueUserIdConstants.has(userId) ? undefined : userId));
        }
        else {
            return next.handle(httpRequest);
        }
        return userIdObservable.pipe(concatMap((userId) => {
            if (userId) {
                const request = httpRequest.clone({
                    headers: httpRequest.headers.set(this.userIdHeader, userId),
                });
                return next.handle(request);
            }
            else {
                return next.handle(httpRequest);
            }
        }));
    }
}
UserIdHttpHeaderInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserIdHttpHeaderInterceptor, deps: [{ token: i1.Config }, { token: i1.UserIdService }, { token: OCC_USER_ID_CONSTANTS }], target: i0.ɵɵFactoryTarget.Injectable });
UserIdHttpHeaderInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserIdHttpHeaderInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserIdHttpHeaderInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Config }, { type: i1.UserIdService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [OCC_USER_ID_CONSTANTS]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1pZC1odHRwLWhlYWRlci5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vcm9vdC9pbnRlcmNlcHRvcnMvdXNlci1pZC1odHRwLWhlYWRlci5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBRUwsY0FBYyxFQUNkLHFCQUFxQixHQUV0QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBSWhEOzs7R0FHRztBQUVILE1BQU0sT0FBTywyQkFBMkI7SUFLdEMsWUFDWSxNQUFjLEVBQ2QsYUFBNEIsRUFFNUIsZUFBaUQ7UUFIakQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBRTVCLG9CQUFlLEdBQWYsZUFBZSxDQUFrQztRQVIxQyxpQkFBWSxHQUFHLDRCQUE0QixDQUFDO1FBVTdELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELFNBQVMsQ0FDUCxXQUFpQyxFQUNqQyxJQUFpQjtRQUVqQixrRkFBa0Y7UUFDbEYsSUFBSSxDQUFhLElBQUksQ0FBQyxNQUFPLENBQUMsR0FBRyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRTtZQUMzRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDakM7UUFFRCxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUUzRCxJQUFJLGdCQUFnRCxDQUFDO1FBRXJELElBQUksT0FBTyxVQUFVLENBQUMsa0JBQWtCLEtBQUssUUFBUSxFQUFFO1lBQ3JELGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUN0RDthQUFNLElBQUksVUFBVSxDQUFDLGtCQUFrQixFQUFFO1lBQ3hDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxhQUFhO2lCQUNsQyxVQUFVLEVBQUU7aUJBQ1osSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQ2IsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQzVELENBQ0YsQ0FBQztTQUNMO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDakM7UUFFRCxPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FDMUIsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbkIsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztvQkFDaEMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDO2lCQUM1RCxDQUFDLENBQUM7Z0JBRUgsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzdCO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNqQztRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOzt3SEF0RFUsMkJBQTJCLHFFQVE1QixxQkFBcUI7NEhBUnBCLDJCQUEyQixjQURkLE1BQU07MkZBQ25CLDJCQUEyQjtrQkFEdkMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OzBCQVM3QixNQUFNOzJCQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIEh0dHBFdmVudCxcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBJbnRlcmNlcHRvcixcbiAgSHR0cFJlcXVlc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29uZmlnLFxuICBPQ0NfSFRUUF9UT0tFTixcbiAgT0NDX1VTRVJfSURfQ09OU1RBTlRTLFxuICBVc2VySWRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNvbmNhdE1hcCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBc21Db25maWcgfSBmcm9tICcuLi9jb25maWcvYXNtLWNvbmZpZyc7XG5cbi8qKlxuICogTG9va3MgZm9yIGEgc3BlY2lmaWMga2V5IGluIHRoZSBIdHRwUmVxdWVzdCdzIGNvbnRleHQgKE9DQ19BU01fVE9LRU4pIHRvIGRlY2lkZSB3aGVuIHRvXG4gKiBjb25maWd1cmUgYSByZXF1ZXN0IHdpdGggJ3NhcC1jb21tZXJjZS1jbG91ZC11c2VyLWlkJyBoZWFkZXIuXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgVXNlcklkSHR0cEhlYWRlckludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHVzZXJJZEhlYWRlciA9ICdzYXAtY29tbWVyY2UtY2xvdWQtdXNlci1pZCc7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHVuaXF1ZVVzZXJJZENvbnN0YW50czogU2V0PHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnLFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIEBJbmplY3QoT0NDX1VTRVJfSURfQ09OU1RBTlRTKVxuICAgIHByb3RlY3RlZCB1c2VySWRDb25zdGFudHM6IHsgW2lkZW50aWZpZXI6IHN0cmluZ106IHN0cmluZyB9XG4gICkge1xuICAgIHRoaXMudW5pcXVlVXNlcklkQ29uc3RhbnRzID0gbmV3IFNldChPYmplY3QudmFsdWVzKHVzZXJJZENvbnN0YW50cykpO1xuICB9XG5cbiAgaW50ZXJjZXB0KFxuICAgIGh0dHBSZXF1ZXN0OiBIdHRwUmVxdWVzdDx1bmtub3duPixcbiAgICBuZXh0OiBIdHRwSGFuZGxlclxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDx1bmtub3duPj4ge1xuICAgIC8vIENhc3RpbmcgYXMgPEFzbUNvbmZpZz4gdG8gYXZvaWQgY2lyY3VsYXIgZGVwZW5kZW5jaWVzIHdpdGggQHNwYXJ0YWN1cy9hc20vY29yZS5cbiAgICBpZiAoISg8QXNtQ29uZmlnPnRoaXMuY29uZmlnKS5hc20/LnVzZXJJZEh0dHBIZWFkZXI/LmVuYWJsZSkge1xuICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKGh0dHBSZXF1ZXN0KTtcbiAgICB9XG5cbiAgICBjb25zdCBhc21Db250ZXh0ID0gaHR0cFJlcXVlc3QuY29udGV4dC5nZXQoT0NDX0hUVFBfVE9LRU4pO1xuXG4gICAgbGV0IHVzZXJJZE9ic2VydmFibGU6IE9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPjtcblxuICAgIGlmICh0eXBlb2YgYXNtQ29udGV4dC5zZW5kVXNlcklkQXNIZWFkZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICB1c2VySWRPYnNlcnZhYmxlID0gb2YoYXNtQ29udGV4dC5zZW5kVXNlcklkQXNIZWFkZXIpO1xuICAgIH0gZWxzZSBpZiAoYXNtQ29udGV4dC5zZW5kVXNlcklkQXNIZWFkZXIpIHtcbiAgICAgIHVzZXJJZE9ic2VydmFibGUgPSB0aGlzLnVzZXJJZFNlcnZpY2VcbiAgICAgICAgLnRha2VVc2VySWQoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoKHVzZXJJZCkgPT5cbiAgICAgICAgICAgIHRoaXMudW5pcXVlVXNlcklkQ29uc3RhbnRzLmhhcyh1c2VySWQpID8gdW5kZWZpbmVkIDogdXNlcklkXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV4dC5oYW5kbGUoaHR0cFJlcXVlc3QpO1xuICAgIH1cblxuICAgIHJldHVybiB1c2VySWRPYnNlcnZhYmxlLnBpcGUoXG4gICAgICBjb25jYXRNYXAoKHVzZXJJZCkgPT4ge1xuICAgICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgICAgY29uc3QgcmVxdWVzdCA9IGh0dHBSZXF1ZXN0LmNsb25lKHtcbiAgICAgICAgICAgIGhlYWRlcnM6IGh0dHBSZXF1ZXN0LmhlYWRlcnMuc2V0KHRoaXMudXNlcklkSGVhZGVyLCB1c2VySWQpLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBuZXh0LmhhbmRsZShodHRwUmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19