import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { createFrom } from '../../util/create-from';
import { SearchboxService } from '../facade/searchbox.service';
import { ProductActions } from '../store/index';
import { ProductSearchSuggestionResultsEvent } from './product-search-events';

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
    this.registerProductSuggestionResultsEvent();
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

  /**
   * Returns a stream listening to suggestions results and actions that returns ProductSearchSuggestionResultsEvent
   */
  protected buildSuggestionResultsEvent(): Observable<
    ProductSearchSuggestionResultsEvent
  > {
    return this.searchBoxService.getSuggestionResults().pipe(
      withLatestFrom(this.getAction(ProductActions.GET_PRODUCT_SUGGESTIONS)),
      map(([suggestions, searchAction]) =>
        createFrom(ProductSearchSuggestionResultsEvent, {
          searchQuery: searchAction?.payload?.term,
          searchSuggestions: suggestions,
        })
      )
    );
  }

  // TODO_LP place in util file
  /**
   * Returns a stream of actions only of a given type(s)
   *
   * @param actionType type(s) of actions
   */
  protected getAction(
    actionType: string | string[]
  ): Observable<{ type: string; payload?: any }> {
    return this.actionsSubject.pipe(ofType(...[].concat(actionType)));
  }
}
