import { Injectable } from '@angular/core';
import { AsyncSubject } from 'rxjs/AsyncSubject';

import { ProductSearchService } from '../occ/occ-core/product-search.service';

@Injectable()
export class ProductLoaderService {

    constructor(
        protected productSearchService: ProductSearchService
    ) { }

    searchProducts(query: string): AsyncSubject<any> {
        const s = new AsyncSubject<any>();
        this.productSearchService.incrementalSearch(query)
            .then((pageData) => {
                s.next(pageData);
                s.complete();
                // this.loadComponentsForTemplate(pageData, pageData.pageLabel);
                // this.storeComponents(pageData.components, PAGE_COMPONENTS);
        });
        return s;

    }
}
