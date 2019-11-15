import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  ComponentFactoryResolver,
  NgModule,
} from '@angular/core';
import { Config, ConfigModule, I18nModule } from '@spartacus/core';
import {
  OutletPosition,
  OutletService,
} from 'projects/storefrontlib/src/cms-structure';
import { defaultSkipLinkConfig, SkipLinkConfig } from './config';
import { SkipLinkComponent } from './skip-link.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(defaultSkipLinkConfig),
  ],
  declarations: [SkipLinkComponent],
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
    outletService.add('cx-storefront', factory, OutletPosition.BEFORE);
  };
  return isReady;
}
