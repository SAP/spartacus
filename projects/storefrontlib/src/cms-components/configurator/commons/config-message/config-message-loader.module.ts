import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  ComponentFactory,
  ComponentFactoryResolver,
  NgModule,
} from '@angular/core';
import { OutletPosition } from '../../../../cms-structure/outlet/outlet.model';
import { OutletService } from '../../../../cms-structure/outlet/outlet.service';
import { PageComponentModule } from '../../../../cms-structure/page/component/page-component.module';
import { ConfigMessageComponent } from './config-message.component';

@NgModule({
  imports: [CommonModule, PageComponentModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: bannerFactory,
      deps: [ComponentFactoryResolver, OutletService],
      multi: true,
    },
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
