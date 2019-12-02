import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  ComponentFactory,
  ComponentFactoryResolver,
  NgModule,
} from '@angular/core';
import { OutletPosition, OutletService } from '@spartacus/storefront';
import { CartEventModule } from './cart/index';
import { CmsEventModule } from './cms/index';
import { EventDemoComponent } from './event-demo.component';
import { UiEventModule } from './ui/index';

/**
 * Demonstrate the usage of the new event system. By adding this module, we're
 * adding serveral event modules to Spartacus, as well as the `EventDemoComponent`.
 */
@NgModule({
  imports: [CommonModule, UiEventModule, CartEventModule, CmsEventModule],
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
