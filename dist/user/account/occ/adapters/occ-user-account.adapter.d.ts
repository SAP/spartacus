import { HttpClient } from '@angular/common/http';
import { ConverterService, LoggerService, OccEndpointsService } from '@spartacus/core';
import { UserAccountAdapter } from '@spartacus/user/account/core';
import { User } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccUserAccountAdapter implements UserAccountAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    load(userId: string): Observable<User>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccUserAccountAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccUserAccountAdapter>;
}
