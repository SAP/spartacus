import { Injectable, inject } from '@angular/core';
import { FeatureConfigService, RoutingService, } from '@spartacus/core';
import { switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/smart-edit-launcher.service";
export class CmsTicketInterceptor {
    constructor(service) {
        this.service = service;
        this.routingService = inject(RoutingService);
        this.featureConfig = inject(FeatureConfigService);
    }
    intercept(request, next) {
        const cmsTicketId = this.service.cmsTicketId;
        if (!cmsTicketId) {
            return next.handle(request);
        }
        if (this.featureConfig.isLevel('6.6') &&
            request.url.includes('/productList')) {
            return this.setRequestForProductListPage(request, next, cmsTicketId);
        }
        if (request.url.includes('/cms/') || request.url.includes('/products/')) {
            request = request.clone({
                setParams: {
                    cmsTicketId,
                },
            });
        }
        return next.handle(request);
    }
    setRequestForProductListPage(request, next, cmsTicketId) {
        return this.routingService.getPageContext().pipe(take(1), switchMap((pageContext) => {
            request = request.clone(!!pageContext.id
                ? {
                    setParams: {
                        cmsTicketId,
                        categoryCode: pageContext.id,
                    },
                }
                : {
                    setParams: {
                        cmsTicketId,
                    },
                });
            return next.handle(request);
        }));
    }
}
CmsTicketInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsTicketInterceptor, deps: [{ token: i1.SmartEditLauncherService }], target: i0.ɵɵFactoryTarget.Injectable });
CmsTicketInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsTicketInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CmsTicketInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.SmartEditLauncherService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21zLXRpY2tldC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9zbWFydGVkaXQvcm9vdC9odHRwLWludGVyY2VwdG9ycy9jbXMtdGlja2V0LmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVlBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFDTCxvQkFBb0IsRUFFcEIsY0FBYyxHQUNmLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBSWpELE1BQU0sT0FBTyxvQkFBb0I7SUFHL0IsWUFBc0IsT0FBaUM7UUFBakMsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7UUFGdkQsbUJBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDeEMsa0JBQWEsR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNhLENBQUM7SUFFM0QsU0FBUyxDQUNQLE9BQXlCLEVBQ3pCLElBQWlCO1FBRWpCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQzdDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdCO1FBQ0QsSUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQ3BDO1lBQ0EsT0FBTyxJQUFJLENBQUMsNEJBQTRCLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztTQUN0RTtRQUNELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDdkUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ3RCLFNBQVMsRUFBRTtvQkFDVCxXQUFXO2lCQUNaO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVTLDRCQUE0QixDQUNwQyxPQUF5QixFQUN6QixJQUFpQixFQUNqQixXQUFtQjtRQUVuQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUM5QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsU0FBUyxDQUFDLENBQUMsV0FBd0IsRUFBRSxFQUFFO1lBQ3JDLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUNyQixDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ2QsQ0FBQyxDQUFDO29CQUNFLFNBQVMsRUFBRTt3QkFDVCxXQUFXO3dCQUNYLFlBQVksRUFBRSxXQUFXLENBQUMsRUFBRTtxQkFDN0I7aUJBQ0Y7Z0JBQ0gsQ0FBQyxDQUFDO29CQUNFLFNBQVMsRUFBRTt3QkFDVCxXQUFXO3FCQUNaO2lCQUNGLENBQ04sQ0FBQztZQUNGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7aUhBdkRVLG9CQUFvQjtxSEFBcEIsb0JBQW9CLGNBRFAsTUFBTTsyRkFDbkIsb0JBQW9CO2tCQURoQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIEh0dHBFdmVudCxcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBJbnRlcmNlcHRvcixcbiAgSHR0cFJlcXVlc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRmVhdHVyZUNvbmZpZ1NlcnZpY2UsXG4gIFBhZ2VDb250ZXh0LFxuICBSb3V0aW5nU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFNtYXJ0RWRpdExhdW5jaGVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NtYXJ0LWVkaXQtbGF1bmNoZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQ21zVGlja2V0SW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICByb3V0aW5nU2VydmljZSA9IGluamVjdChSb3V0aW5nU2VydmljZSk7XG4gIGZlYXR1cmVDb25maWcgPSBpbmplY3QoRmVhdHVyZUNvbmZpZ1NlcnZpY2UpO1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc2VydmljZTogU21hcnRFZGl0TGF1bmNoZXJTZXJ2aWNlKSB7fVxuXG4gIGludGVyY2VwdChcbiAgICByZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIG5leHQ6IEh0dHBIYW5kbGVyXG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBjb25zdCBjbXNUaWNrZXRJZCA9IHRoaXMuc2VydmljZS5jbXNUaWNrZXRJZDtcbiAgICBpZiAoIWNtc1RpY2tldElkKSB7XG4gICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdCk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHRoaXMuZmVhdHVyZUNvbmZpZy5pc0xldmVsKCc2LjYnKSAmJlxuICAgICAgcmVxdWVzdC51cmwuaW5jbHVkZXMoJy9wcm9kdWN0TGlzdCcpXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRSZXF1ZXN0Rm9yUHJvZHVjdExpc3RQYWdlKHJlcXVlc3QsIG5leHQsIGNtc1RpY2tldElkKTtcbiAgICB9XG4gICAgaWYgKHJlcXVlc3QudXJsLmluY2x1ZGVzKCcvY21zLycpIHx8IHJlcXVlc3QudXJsLmluY2x1ZGVzKCcvcHJvZHVjdHMvJykpIHtcbiAgICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcbiAgICAgICAgc2V0UGFyYW1zOiB7XG4gICAgICAgICAgY21zVGlja2V0SWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0UmVxdWVzdEZvclByb2R1Y3RMaXN0UGFnZShcbiAgICByZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIG5leHQ6IEh0dHBIYW5kbGVyLFxuICAgIGNtc1RpY2tldElkOiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIHRoaXMucm91dGluZ1NlcnZpY2UuZ2V0UGFnZUNvbnRleHQoKS5waXBlKFxuICAgICAgdGFrZSgxKSxcbiAgICAgIHN3aXRjaE1hcCgocGFnZUNvbnRleHQ6IFBhZ2VDb250ZXh0KSA9PiB7XG4gICAgICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKFxuICAgICAgICAgICEhcGFnZUNvbnRleHQuaWRcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIHNldFBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgY21zVGlja2V0SWQsXG4gICAgICAgICAgICAgICAgICBjYXRlZ29yeUNvZGU6IHBhZ2VDb250ZXh0LmlkLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgIHNldFBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgY21zVGlja2V0SWQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==