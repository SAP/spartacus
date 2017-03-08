import { Injectable } from '@angular/core';
import { BaseService } from './base.service';


@Injectable()
export class OccProductSearchService extends BaseService {

    private createTextSearchEndpoint(textquery: string): string {
        let url = this.getProductSearchEndpoint();
        url += '?query=' + textquery;
        return url;
    }


    private createCategorySearchEndpoint(categoryCode: string, brandCode: string, sort?: string): string {
        let url = this.getProductSearchEndpoint();
        url += '?query=';
        if (sort) {
            url += ':' + sort;
        }
        if (categoryCode) {
            url += ':category:' + categoryCode;
        }
        if (brandCode) {
            url += ':brand:' + brandCode;
        }
        // url += '&pageSize=10';
        return url;
     }


    /**
     * @description
     * Search products by...
     * 
     * @param {string} query
     * @returns
     * 
     * @memberOf OccProductSearchService
     */
    incrementalSearch(query: string, pageSize = 3) {
        let url = this.createTextSearchEndpoint(query);
        url += '&pageSize=' + pageSize;
        url += '&fields=products(code,name,images(DEFAULT)),pagination';
        return this.doSearch(url);
    }
    
    query(fullQuery: string): Promise<any> {
        let url = this.createTextSearchEndpoint(fullQuery);
        url += '&pageSize=20&fields=products(code,name,summary,price,images(DEFAULT)),facets,breadcrumbs,pagination(DEFAULT)';
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

    freeTextSearch(textquery: string, sort: string) {
        let url = this.createTextSearchEndpoint(textquery);
        url += '&pageSize=20&fields=products(code,name,summary,price,images(DEFAULT)),facets,breadcrumbs,pagination(DEFAULT)';
        return this.doSearch(url);
    }

    searchByCategory(categoryCode: string, brandCode: string, sort: string) {
        let url = this.createCategorySearchEndpoint(categoryCode, brandCode, sort);
        url += '&pageSize=20&fields=products(code,name,summary,price,images(DEFAULT)),facets,pagination(DEFAULT)';
        return this.doSearch(url);
    }

    private logError(error) {
        console.log('error', error)
    }

}
