import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SearchConfig } from './search-config';
import { OccProductSearchService } from '../occ/occ-core/product-search.service';

const DEFAULT_CONFIG = new SearchConfig(10);

@Injectable()
export class ProductSearchService {
    constructor(
        protected occProductSearchService: OccProductSearchService
    ) {}

    createConfig(): SearchConfig {
        return DEFAULT_CONFIG;
    }

    searchProducts(queryText: string, queryConfig = DEFAULT_CONFIG, subject?: BehaviorSubject<any>): BehaviorSubject<any> {
        if (!subject) {
            subject = new BehaviorSubject<any>({});
        }
        this.occProductSearchService.query(queryText, queryConfig.pageSize)
            .then((pageData) => {
                subject.next(pageData);
        });
        return subject;
    }

    searchSuggestions(term: string, queryConfig = DEFAULT_CONFIG, subject?: BehaviorSubject<any>): BehaviorSubject<any> {
        if (term === '') {
            subject.next([]);
            return;
        }
        if (!subject) {
            subject = new BehaviorSubject<any>({});
        }
        this.occProductSearchService.queryProductSuggestions(term, queryConfig.pageSize)
            .then((suggestionData) => {
                subject.next(suggestionData.suggestions);
        });
        return subject;
    }


}
