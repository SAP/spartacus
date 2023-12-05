import { HttpClient } from '@angular/common/http';
import { OccEndpointsService, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CpqAccessData } from './cpq-access-data.models';
import * as i0 from "@angular/core";
export declare class CpqAccessLoaderService {
    protected http: HttpClient;
    protected occEndpointsService: OccEndpointsService;
    protected userIdService: UserIdService;
    constructor(http: HttpClient, occEndpointsService: OccEndpointsService, userIdService: UserIdService);
    getCpqAccessData(): Observable<CpqAccessData>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqAccessLoaderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqAccessLoaderService>;
}
