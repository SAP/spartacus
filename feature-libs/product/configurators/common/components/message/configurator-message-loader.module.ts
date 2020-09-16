import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  ComponentFactory,
  ComponentFactoryResolver,
  NgModule,
} from '@angular/core';
import { Config, provideDefaultConfig } from '@spartacus/core';
import {
  OutletPosition,
  OutletService,
  PageComponentModule,
} from '@spartacus/storefront';
import { DefaultMessageConfig } from '../config/default-message-config';
import { MessageConfig } from '../config/message-config';
import { ConfiguratorMessageComponent } from './configurator-message.component';

@NgModule({
  imports: [CommonModule, PageComponentModule],
  providers: [
    provideDefaultConfig(DefaultMessageConfig),
    {
      provide: APP_INITIALIZER,
      useFactory: bannerFactory,
      deps: [ComponentFactoryResolver, OutletService],
      multi: true,
    },
    { provide: MessageConfig, useExisting: Config },
  ],
})
export class ConfigurationMessageLoaderModule {}

export function bannerFactory(
  componentFactoryResolver: ComponentFactoryResolver,
  outletService: OutletService<ComponentFactory<any>>
) {
  const isReady = () => {
    const factory = componentFactoryResolver.resolveComponentFactory(
      ConfiguratorMessageComponent
    );
    outletService.add('cx-header', factory, OutletPosition.AFTER);
  };
  return isReady;
}
