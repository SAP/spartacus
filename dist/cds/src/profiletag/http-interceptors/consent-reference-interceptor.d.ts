import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ProfileTagEventService } from '../services/profiletag-event.service';
import * as i0 from "@angular/core";
export declare class ConsentReferenceInterceptor implements HttpInterceptor {
    private profileTagEventTracker;
    private occEndpoints;
    constructor(profileTagEventTracker: ProfileTagEventService, occEndpoints: OccEndpointsService);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    private isOccUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConsentReferenceInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConsentReferenceInterceptor>;
}
