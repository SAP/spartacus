import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country, CountryType, Region } from '../../../model/address.model';
import { BaseSite, Currency, Language } from '../../../model/misc.model';
import { SiteAdapter } from '../../../site-context/connectors/site.adapter';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import * as i0 from "@angular/core";
export declare class OccSiteAdapter implements SiteAdapter {
    protected http: HttpClient;
    protected occEndpointsService: OccEndpointsService;
    protected converterService: ConverterService;
    constructor(http: HttpClient, occEndpointsService: OccEndpointsService, converterService: ConverterService);
    loadLanguages(): Observable<Language[]>;
    loadCurrencies(): Observable<Currency[]>;
    loadCountries(type?: CountryType): Observable<Country[]>;
    loadRegions(countryIsoCode: string): Observable<Region[]>;
    /**
     * There is no OCC API to load one site based on Uid.
     * So, we have to load all sites, and find the one from the list.
     */
    loadBaseSite(siteUid?: string): Observable<BaseSite | undefined>;
    loadBaseSites(): Observable<BaseSite[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccSiteAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccSiteAdapter>;
}
