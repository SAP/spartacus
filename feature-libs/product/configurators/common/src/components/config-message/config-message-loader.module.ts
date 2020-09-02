import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  ComponentFactory,
  ComponentFactoryResolver,
  NgModule,
} from '@angular/core';
import { Config, ConfigModule } from '@spartacus/core';
import {
  OutletPosition,
  OutletService,
  PageComponentModule,
} from '@spartacus/storefront';
import { DefaultMessageConfig } from './../config/default-message-config';
import { MessageConfig } from './../config/message-config';
import { ConfigMessageComponent } from './config-message.component';

@NgModule({
  imports: [
    CommonModule,
    PageComponentModule,
    ConfigModule.withConfig(DefaultMessageConfig),
  ],
  providers: [
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
      ConfigMessageComponent
    );
    outletService.add('cx-header', factory, OutletPosition.AFTER);
  };
  return isReady;
}
