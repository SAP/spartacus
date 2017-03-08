import { Injectable } from '@angular/core';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { OccProductService } from '../occ/occ-core/product.service';
import { OccProductSearchService } from '../occ/occ-core/product-search.service';
import { ProductModelService } from './product-model.service';

const DEFAULT_SORT = 'relevance';

@Injectable()
export class ProductLoaderService {

    status = {};

    constructor(
        protected occProductService: OccProductService,
        protected occProductSearchService: OccProductSearchService,
        protected productModelService: ProductModelService
    ) { }

    /**
     * @desc delegates to the cached model
     * @param productCode
     */
    getSubscription(productCode: string) {
        return this.productModelService.getSubscription(productCode);
    }

    loadProduct(productCode: string) {
        const key = productCode;
        if (this.isLoaded(productCode)) {
            return;
        }
        this.startLoading(productCode);
        this.occProductService.loadProduct(productCode)
            .then((productData) => {
                this.productModelService.storeProduct(productData['code'], productData);
        });
    }

    loadReviews(productCode: string) {
        const key = productCode + 'reviews';
        if (this.isLoaded(key)) {
            return;
        }
        this.startLoading(key);
        this.occProductService.loadProductReviews(productCode)
            .then((reviewData) => {
                this.productModelService.storeProduct(key, reviewData);
        });
    }

    loadReferences(productCode: string) {
        const key = productCode + 'references';
        if (this.isLoaded(key)) {
            return;
        }
        this.startLoading(key);
        this.occProductService.loadProductReferences(productCode)
            .then((reviewData) => {
                this.productModelService.storeProduct(key, reviewData.productReferences);
        });
    }


    startLoading(productCode) {
        this.status[productCode] = true;
    }
    isLoaded(productCode: string) {
        return (this.status.hasOwnProperty(productCode));
    }

    query(query: string) {
        const s = new AsyncSubject<any>();
        this.occProductSearchService.query(query)
            .then((pageData) => {
                s.next(pageData);
                s.complete();
        });
        return s;
    };

    searchProducts(query: string): AsyncSubject<any> {
        const s = new AsyncSubject<any>();
        this.occProductSearchService.freeTextSearch(query, DEFAULT_SORT)
            .then((pageData) => {
                s.next(pageData);
                s.complete();
        });
        return s;
    }

    incrementalSearchProducts(subject, query: string) {
        // const s = new AsyncSubject<any>();
        this.occProductSearchService.incrementalSearch(query)
            .then((pageData) => {
                subject.next(pageData);
                // subject.complete();
        });
        // return s;
    }

    categorySearch(categoryCode: string, brandCode: string, sort = DEFAULT_SORT): BehaviorSubject<any> {
        const s = new BehaviorSubject<any>({});
        this.occProductSearchService.searchByCategory(categoryCode, brandCode, sort)
            .then((pageData) => {
                s.next(pageData);
        });
        return s;
    }


}
