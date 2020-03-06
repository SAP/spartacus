import { Component, Injector } from '@angular/core';
import {
  CartEvents,
  CmsEvents,
  EventService,
  MultiCartService,
} from '@spartacus/core';
import { RoutingEvents } from 'projects/core/src/routing/event/routing-event.model';
import { map } from 'rxjs/operators';
import { AddedToCartContextAware } from './added-to-cart-context-aware';
import { ClickEvent } from './ui/ui-event.model';

/**
 * This demo component adds a click event to the cx-storefront,
 * as well as subscribing to a couple of events.
 */
@Component({
  selector: 'cx-event-demo',
  template: `
    <button cxUiEvent="click">DEMO UI EVENT</button>
  `,
})
export class EventDemoComponent {
  constructor(
    protected eventService: EventService,
    protected injector: Injector
  ) {
    this.demo1();
  }

  demo1() {
    const cartEvents$ = this.eventService.get([
      CartEvents.AddCartEntry,
      CartEvents.AddCartEntrySuccess,
    ]);
    cartEvents$.subscribe(e => console.log('cart event', e));
    console.log('subscribed cart events');

    const spike$ = this.eventService.get([
      CmsEvents.LoadCmsPageDataSuccess,
      ClickEvent,
      RoutingEvents.NavigationSuccess,
      RoutingEvents.NavigationCancel,
      RoutingEvents.Navigation,
    ]);
    spike$.subscribe(console.log);
    console.log('subscribed other events');

    const custom$ = this.eventService.get(AddedToCartContextAware);
    custom$.subscribe(console.log);
    console.log('subscribed custom');

    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    // COLLECTOR
    // idea for associating UI event with add to cart action
    // later on associate the added to cart success with the add to cart action
    // therefore we can associate the UI event with the added to cart event

    const multiCartService = this.injector.get(MultiCartService);
    custom$
      .pipe(
        // mergeMap(event =>
        //   multiCartService.getCart(event.added.cartId).pipe(
        //     take(1), // CAUTION!!! otherwise will emit on each cart state change! not only on specific event emission
        //     map(cart => ({ ...event, cart }))
        //   )
        // )
        map(event => {
          let cart;
          multiCartService
            .getCart(event.added.cartId)
            .subscribe(c => (cart = c))
            .unsubscribe(); // synchronously take current value;
          return { ...event, cart };
        })
      )
      .subscribe(e => console.log('tag collector using data from store', e));
  }
}
