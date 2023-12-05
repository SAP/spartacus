import { Observable } from 'rxjs';
import { Country, CountryType, Region } from '../../model/address.model';
import { BaseSite, Currency, Language } from '../../model/misc.model';
import { SiteAdapter } from './site.adapter';
import * as i0 from "@angular/core";
export declare class SiteConnector {
    protected adapter: SiteAdapter;
    constructor(adapter: SiteAdapter);
    getLanguages(): Observable<Language[]>;
    getCurrencies(): Observable<Currency[]>;
    getCountries(type?: CountryType): Observable<Country[]>;
    getRegions(countryIsoCode: string): Observable<Region[]>;
    getBaseSite(siteUid?: string): Observable<BaseSite | undefined>;
    getBaseSites(): Observable<BaseSite[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SiteConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SiteConnector>;
}
