import { Component } from '@angular/core';
import { CartAddEvent } from './cart';
import { PageLoadEvent } from './cms';
import { EventService } from './events/index';
import { UiEvent } from './ui';

/**
 * This demo component adds a click event to the cx-storefront,
 * as well as subscribing to a couple of events.
 */
@Component({
  selector: 'cx-event-demo',
  template: `
    <div cxClickEvent="grandparent"></div>
  `,
})
export class EventDemoComponent {
  constructor(eventService: EventService) {
    eventService
      .get(CartAddEvent, PageLoadEvent, UiEvent)
      .subscribe(evData =>
        console.log('combine add-to-cart, page load and click event', evData)
      );
  }
}
