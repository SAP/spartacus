import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

const DEFAULT_PRODUCT_PAGE_LIST = 20;

@Injectable()
export class OccProductSearchService extends BaseService {

    private createTextSearchEndpoint(textquery: string): string {
        let url = this.getProductSearchEndpoint();
        url += '?query=' + textquery;
        return url;
    }

    query(fullQuery: string, pageSize = DEFAULT_PRODUCT_PAGE_LIST): Promise<any> {
        let url = this.createTextSearchEndpoint(fullQuery);
        url += '&pageSize=' + pageSize;
        url += '&fields=products(code,name,summary,price,images(DEFAULT)),facets,breadcrumbs,pagination(DEFAULT)';
        return this.doSearch(url);
    }

    queryProductSuggestions(term: string, pageSize = 3) {
        let url = this.getProductSuggestionsEndpoint();
        url += '?term=' + term;
        url += '&max=' + pageSize;
        return this.doSearch(url);
    }

    doSearch(url: string): Promise<any> {
        return new Promise((resolve) => {
            this.http.get(url).subscribe((data) => {
                const searchResult = data.json();
                this.productImageConverter.convertList(searchResult.products);
                resolve(searchResult);
            },
            err => this.logError(err));
        });
    }

    private logError(error) {
        console.log('error', error);
    }

}
