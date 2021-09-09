import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  ComponentFactoryResolver,
  NgModule,
} from '@angular/core';
import {
  ConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { OutletPosition } from '../../../cms-structure/outlet/outlet.model';
import { OutletService } from '../../../cms-structure/outlet/outlet.service';
import { KeyboardFocusModule } from '../keyboard-focus/keyboard-focus.module';
import { SkipLinkComponent } from './component/skip-link.component';
import { defaultSkipLinkConfig } from './config/default-skip-link.config';
import { SkipLinkDirective } from './directive/skip-link.directive';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(defaultSkipLinkConfig),
    KeyboardFocusModule,
  ],
  declarations: [SkipLinkComponent, SkipLinkDirective],
  exports: [SkipLinkDirective],
  providers: [
    provideDefaultConfig(defaultSkipLinkConfig),
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
