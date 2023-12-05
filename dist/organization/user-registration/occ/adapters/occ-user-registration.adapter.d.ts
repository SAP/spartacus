import { HttpClient } from '@angular/common/http';
import { ConverterService, LoggerService, OccEndpointsService } from '@spartacus/core';
import { UserRegistrationAdapter } from '@spartacus/organization/user-registration/core';
import { OrganizationUserRegistration } from '@spartacus/organization/user-registration/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccUserRegistrationAdapter implements UserRegistrationAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    registerUser(userData: OrganizationUserRegistration): Observable<OrganizationUserRegistration>;
    protected getOrganizationUserRegistrationEndpoint(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccUserRegistrationAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccUserRegistrationAdapter>;
}
