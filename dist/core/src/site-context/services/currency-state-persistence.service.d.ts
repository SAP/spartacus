import { Observable, ReplaySubject } from 'rxjs';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { SiteContextConfig } from '../config/site-context-config';
import { CurrencyService } from '../facade/currency.service';
import * as i0 from "@angular/core";
export declare class CurrencyStatePersistenceService {
    protected statePersistenceService: StatePersistenceService;
    protected currencyService: CurrencyService;
    protected config: SiteContextConfig;
    constructor(statePersistenceService: StatePersistenceService, currencyService: CurrencyService, config: SiteContextConfig);
    protected initialized$: ReplaySubject<unknown>;
    initSync(): Observable<unknown>;
    protected onRead(valueFromStorage: string | undefined): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrencyStatePersistenceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CurrencyStatePersistenceService>;
}
