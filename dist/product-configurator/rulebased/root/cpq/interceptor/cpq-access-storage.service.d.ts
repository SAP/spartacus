import { OnDestroy } from '@angular/core';
import { AuthService } from '@spartacus/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CpqAccessData } from './cpq-access-data.models';
import { CpqAccessLoaderService } from './cpq-access-loader.service';
import { CpqConfiguratorAuthConfig } from './cpq-configurator-auth.config';
import * as i0 from "@angular/core";
export declare class CpqAccessStorageService implements OnDestroy {
    protected cpqAccessLoaderService: CpqAccessLoaderService;
    protected authService: AuthService;
    protected config: CpqConfiguratorAuthConfig;
    protected readonly EXPIRED_TOKEN: CpqAccessData;
    constructor(cpqAccessLoaderService: CpqAccessLoaderService, authService: AuthService, config: CpqConfiguratorAuthConfig);
    ngOnDestroy(): void;
    protected cpqAccessData$: Observable<CpqAccessData>;
    protected currentCpqAccessSubscription: Subscription;
    protected currentAuthServiceSubscription: Subscription;
    protected _cpqAccessData$: BehaviorSubject<CpqAccessData>;
    getCpqAccessData(): Observable<CpqAccessData>;
    /**
     * Renews the current access data. All subscribers of getCachedCpqAccessData()
     * will receive the new data. Will only have an effect, if there are any subscribers
     * and the user is logged in.
     */
    renewCpqAccessData(): void;
    protected initCpqAccessData(): void;
    protected stopAutoFetchingCpqAccessData(): void;
    protected startAutoFetchingCpqAccessData(): void;
    protected fetchNextTokenIn(data: CpqAccessData): number;
    protected isTokenExpired(tokenData: CpqAccessData): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqAccessStorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqAccessStorageService>;
}
