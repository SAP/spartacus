import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
  NgModule,
} from '@angular/core';
import { CartEvents, CmsEvents, EventService } from '@spartacus/core';
import { OutletPosition, OutletService } from '@spartacus/storefront';
import { RoutingEvents } from 'projects/core/src/routing/event/routing-event.model';
import { map, withLatestFrom } from 'rxjs/operators';
import { AddedToCartContextAware } from './added-to-cart-context-aware';
import { EventDemoComponent } from './event-demo.component';
import { UiEventModule } from './ui/index';

@Injectable({ providedIn: 'root' })
export class CustomEventBuilder {
  constructor(protected eventService: EventService) {
    this.register();
  }

  protected register() {
    this.eventService.register(
      AddedToCartContextAware,
      this.eventService.get(CartEvents.AddCartEntrySuccess).pipe(
        withLatestFrom(
          this.eventService.get(CmsEvents.LoadCmsPageDataSuccess),
          this.eventService.get(RoutingEvents.NavigationSuccess)
        ),
        map(
          ([eAdded, ePage, eNavigated]) =>
            new AddedToCartContextAware({
              url: eNavigated.url,
              page: ePage.page,
              added: eAdded,
            })
        )
      )
    );
  }
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
  ],
  declarations: [EventDemoComponent],
  entryComponents: [EventDemoComponent],
})
export class EventDemoModule {
  constructor(_: CustomEventBuilder) {}
}

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
