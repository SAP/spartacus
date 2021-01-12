import { Injectable } from '@angular/core';
import { EventService, TmsEventCollector } from '@spartacus/core';
import { map } from 'rxjs/operators';
import {
  CategoryPageResultsEvent,
  ProductDetailsPageEvent,
  SearchPageResultsEvent,
} from './product-page.events';

/**
 * Product page event collectors
 */
@Injectable({ providedIn: 'root' })
export class ProductPageEventCollector extends TmsEventCollector {
  protected productDetailsPageEvent$ = this.eventsService
    .get(ProductDetailsPageEvent)
    .pipe(map((event) => this.mapEvent(ProductDetailsPageEvent.type, event)));

  protected categoryPageResultsEvent$ = this.eventsService
    .get(CategoryPageResultsEvent)
    .pipe(map((event) => this.mapEvent(CategoryPageResultsEvent.type, event)));

  protected searchPageResultsEvent$ = this.eventsService
    .get(SearchPageResultsEvent)
    .pipe(map((event) => this.mapEvent(SearchPageResultsEvent.type, event)));

  protected sources = [
    this.productDetailsPageEvent$,
    this.categoryPageResultsEvent$,
    this.searchPageResultsEvent$,
  ];

  constructor(protected eventsService: EventService) {
    super(eventsService);
    this.register();
  }
}
