import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  ComponentFactoryResolver,
  NgModule,
} from '@angular/core';
import { Config, ConfigModule, I18nModule } from '@spartacus/core';
import { OutletPosition } from '../../../cms-structure/outlet/outlet.model';
import { SkipLinkComponent } from './component/skip-link.component';
import { defaultSkipLinkConfig } from './config/default-skip-link.config';
import { SkipLinkConfig } from './config/skip-link.config';
import { SkipLinkDirective } from './directive/skip-link.directive';
import { OutletService } from '../../../cms-structure/outlet/outlet.service';

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
