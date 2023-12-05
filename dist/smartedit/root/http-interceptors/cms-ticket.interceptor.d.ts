import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { FeatureConfigService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { SmartEditLauncherService } from '../services/smart-edit-launcher.service';
import * as i0 from "@angular/core";
export declare class CmsTicketInterceptor implements HttpInterceptor {
    protected service: SmartEditLauncherService;
    routingService: RoutingService;
    featureConfig: FeatureConfigService;
    constructor(service: SmartEditLauncherService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    protected setRequestForProductListPage(request: HttpRequest<any>, next: HttpHandler, cmsTicketId: string): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CmsTicketInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CmsTicketInterceptor>;
}
