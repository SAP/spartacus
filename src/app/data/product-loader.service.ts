import { Injectable } from '@angular/core';
import { OccProductService } from '../occ/occ-core/product.service';
import { OccProductSearchService } from '../occ/occ-core/product-search.service';
import { ProductModelService } from './product-model.service';
import { SiteContextService } from './site-context.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const DEFAULT_SORT = 'relevance';

@Injectable()
export class ProductLoaderService {
  status = {};
  productCode;

  constructor(
    protected occProductService: OccProductService,
    protected occProductSearchService: OccProductSearchService,
    protected productModelService: ProductModelService,
    protected siteLoader: SiteContextService
  ) {
    this.siteLoader
      .getSiteContextChangeSubscription()
      .subscribe((value: number) => {
        if (value > 0) {
          this.refresh();
        }
      });
  }

  refresh() {
    if (this.productCode) {
      this.loadProduct(this.productCode);
    }
  }
  /**
   * @desc delegates to the cached model
   * @param productCode
   */
  getSubscription(productCode: string): BehaviorSubject<any> {
    return this.productModelService.getProduct(productCode);
  }

  loadProduct(productCode: string) {
    this.productCode = productCode;
    const key = productCode;
    if (this.isLoaded(productCode)) {
      return;
    }
    this.startLoading(productCode);
    this.occProductService.loadProduct(productCode).then(productData => {
      this.productModelService.storeProduct(productData['code'], productData);
    });
  }

  loadReviews(productCode: string) {
    const key = productCode + 'reviews';
    if (this.isLoaded(key)) {
      return;
    }
    this.startLoading(key);
    this.occProductService.loadProductReviews(productCode).then(reviewData => {
      this.productModelService.storeProduct(key, reviewData);
    });
  }

  loadReferences(productCode: string) {
    const key = productCode + 'references';
    if (this.isLoaded(key)) {
      return;
    }
    this.startLoading(key);
    this.occProductService
      .loadProductReferences(productCode)
      .then(reviewData => {
        this.productModelService.storeProduct(
          key,
          reviewData.productReferences
        );
      });
  }

  isLoaded(productCode: string) {
    return this.status.hasOwnProperty(productCode);
  }
  private startLoading(productCode) {
    this.status[productCode] = true;
  }
}
