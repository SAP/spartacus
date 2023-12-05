import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { FileReaderService } from '@spartacus/storefront';
import { WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class BlobErrorInterceptor implements HttpInterceptor {
    protected readonly fileReaderService: FileReaderService;
    protected readonly windowRef: WindowRef;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BlobErrorInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BlobErrorInterceptor>;
}
