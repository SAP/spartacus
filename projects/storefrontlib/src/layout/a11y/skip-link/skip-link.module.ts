import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  ComponentFactoryResolver,
  NgModule,
} from '@angular/core';
import { Config, ConfigModule, I18nModule } from '@spartacus/core';

import { defaultSkipLinkConfig, SkipLinkConfig } from './config/index';
import { SkipLinkComponent } from './component/skip-link.component';
import {
  OutletService,
  OutletPosition,
} from 'projects/storefrontlib/src/cms-structure/outlet/index';
import { SkipLinkDirective } from './directive/skip-link.directive';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(defaultSkipLinkConfig),
  ],
  declarations: [SkipLinkComponent, SkipLinkDirective],
  exports: [SkipLinkDirective],
  entryComponents: [SkipLinkComponent],

  providers: [
    { provide: SkipLinkConfig, useExisting: Config },
    {
      provide: APP_INITIALIZER,
      useFactory: skipLinkFactory,
      deps: [ComponentFactoryResolver, OutletService],
      multi: true,
    },
  ],
})
export class SkipLinkModule {}

/**
 * Adds the skip link component before the cx-storefront.
 */
export function skipLinkFactory(
  componentFactoryResolver: ComponentFactoryResolver,
  outletService: OutletService
) {
  const isReady = () => {
    const factory = componentFactoryResolver.resolveComponentFactory(
      SkipLinkComponent
    );
    outletService.add('cx-storefront', <any>factory, OutletPosition.BEFORE);
  };
  return isReady;
}
