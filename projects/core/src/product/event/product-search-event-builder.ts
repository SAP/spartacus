import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { ActionToEventMapping } from '../../state/event/action-to-event-mapping';
import { createFrom } from '../../util/create-from';
import { SearchboxService } from '../facade/searchbox.service';
import { ProductActions } from '../store/index';
import {
  ProductSearchSuggestionResultsEvent,
  ProductSearchTypeEvent,
} from './product-search-events';

@Injectable({
  providedIn: 'root',
})
export class ProductSearchEventBuilder {
  constructor(
    protected actionsSubject: ActionsSubject,
    protected eventService: EventService,
    protected searchBoxService: SearchboxService
  ) {
    this.register();
  }

  /**
   * Registers Search events
   */
  protected register(): void {
    this.registerProductSearchTypeEvent();
    this.registerProductSuggestionResultsEvent();
  }

  /**
   * Registers typing in search bar event
   */
  protected registerProductSearchTypeEvent() {
    this.mapSearchEvent({
      action: ProductActions.GET_PRODUCT_SUGGESTIONS,
      event: ProductSearchTypeEvent,
    });
  }

  /**
   * Registers a the suggestions associated to the search text
   */
  protected registerProductSuggestionResultsEvent() {
    this.eventService.register(
      ProductSearchSuggestionResultsEvent,
      this.buildSuggestionResultsEvent()
    );
  }

  protected mapSearchEvent<T>(mapping: ActionToEventMapping<T>): () => void {
    const eventStream$ = this.getAction(mapping.action).pipe(
      map((action) =>
        createFrom<any>(mapping.event, {
          searchQuery: action.payload.term,
        })
      )
    );

    return this.eventService.register(mapping.event, eventStream$);
  }

  protected buildSuggestionResultsEvent(): Observable<
    ProductSearchSuggestionResultsEvent
  > {
    return this.searchBoxService.getSuggestionResults().pipe(
      withLatestFrom(this.getAction(ProductActions.GET_PRODUCT_SUGGESTIONS)),
      map(([suggestions, searchAction]) =>
        createFrom(ProductSearchSuggestionResultsEvent, {
          searchQuery: searchAction.payload.term,
          searchSuggestions: suggestions,
        })
      )
    );
  }

  protected getAction(
    actionType: string | string[]
  ): Observable<{ type: string; payload?: any }> {
    return this.actionsSubject.pipe(ofType(...[].concat(actionType)));
  }
}
