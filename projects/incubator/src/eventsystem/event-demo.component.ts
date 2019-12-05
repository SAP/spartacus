import { Component } from '@angular/core';
import { CartAddEvent } from './cart';
import { PageLoadEvent } from './cms';
import { EventService } from './events/index';
import { ClickEvent } from './ui';

/**
 * This demo component adds a click event to the cx-storefront,
 * as well as subscribing to a couple of events.
 */
@Component({
  selector: 'cx-event-demo',
  template: `
    <div cxUiEvent="hover" cxUiEventTarget="grandparent"></div>
  `,
})
export class EventDemoComponent {
  constructor(eventService: EventService) {
    // dispatch any of these events using a single API
    eventService.get(ClickEvent, PageLoadEvent).subscribe(console.log);

    // dispatch events together with the main event (CartAddEvent)
    eventService
      .getCombined(CartAddEvent, PageLoadEvent, ClickEvent)
      .subscribe(console.log);
  }
}
