import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  ComponentFactory,
  ComponentFactoryResolver,
  NgModule,
} from '@angular/core';
import {
  CartEvents,
  CmsEvents,
  EventService,
  provideEventSources,
} from '@spartacus/core';
import { OutletPosition, OutletService } from '@spartacus/storefront';
import { RoutingEvents } from 'projects/core/src/routing/event/routing-event.model';
import { map, withLatestFrom } from 'rxjs/operators';
import { AddedToCartContextAware } from './added-to-cart-context-aware';
import { EventDemoComponent } from './event-demo.component';
import { UiEventModule } from './ui/index';

export function customEventSourceFactory(eventService: EventService) {
  const addedToCartWithContext$ = eventService
    .get(CartEvents.AddCartEntrySuccess)
    .pipe(
      withLatestFrom(
        eventService.get(CmsEvents.LoadCmsPageDataSuccess),
        eventService.get(RoutingEvents.NavigationSuccess)
      ),
      map(
        ([eAdded, ePage, eNavigated]) =>
          new AddedToCartContextAware({
            url: eNavigated.url,
            page: ePage.page,
            added: eAdded,
          })
      )
    );
  return [{ type: AddedToCartContextAware, source$: addedToCartWithContext$ }];
}

/**
 * Demonstrate the usage of the new event system. By adding this module, we're
 * adding serveral event modules to Spartacus, as well as the `EventDemoComponent`.
 */
@NgModule({
  imports: [CommonModule, UiEventModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: incubatorEventFactory,
      deps: [ComponentFactoryResolver, OutletService],
      multi: true,
    },
    provideEventSources(customEventSourceFactory, [EventService]),
  ],
  declarations: [EventDemoComponent],
  entryComponents: [EventDemoComponent],
})
export class EventDemoModule {}

export function incubatorEventFactory(
  componentFactoryResolver: ComponentFactoryResolver,
  outletService: OutletService<ComponentFactory<any>>
) {
  const isReady = () => {
    const factory = componentFactoryResolver.resolveComponentFactory(
      EventDemoComponent
    );
    outletService.add('cx-storefront', factory, OutletPosition.BEFORE);
  };
  return isReady;
}
