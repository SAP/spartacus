import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductSearchPage, Suggestion } from '../../../model/product-search.model';
import { ProductSearchAdapter } from '../../../product/connectors/search/product-search.adapter';
import { SearchConfig } from '../../../product/model/search-config';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import * as i0 from "@angular/core";
export declare class OccProductSearchAdapter implements ProductSearchAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    readonly DEFAULT_SEARCH_CONFIG: SearchConfig;
    search(query: string, searchConfig?: SearchConfig): Observable<ProductSearchPage>;
    loadSuggestions(term: string, pageSize?: number): Observable<Suggestion[]>;
    protected getSearchEndpoint(query: string, searchConfig: SearchConfig): string;
    protected getSuggestionEndpoint(term: string, max: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccProductSearchAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccProductSearchAdapter>;
}
