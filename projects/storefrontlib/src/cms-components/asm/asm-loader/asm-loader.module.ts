import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  ComponentFactoryResolver,
  NgModule,
} from '@angular/core';
import {
  OutletPosition,
  OutletService,
  PageComponentModule,
} from '../../../cms-structure/index';
import { AsmLoaderComponent } from './asm-loader.component';

/**
 * The ASM loader module takes care of loading of the ASM UI
 * only in case there's a reason to do so.
 */
@NgModule({
  imports: [CommonModule, PageComponentModule],
  declarations: [AsmLoaderComponent],
  entryComponents: [AsmLoaderComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: asmInitializerFactory,
      deps: [ComponentFactoryResolver, OutletService],
      multi: true,
    },
  ],
})
export class AsmLoaderModule {}

/**
 *
 * We do not like to block the UI, which is why we delgate loading of ASM
 * to a real component; the router and state aren't available in an optimized
 * way during the APP_INITIALIZER.
 */
export function asmInitializerFactory(
  componentFactoryResolver: ComponentFactoryResolver,
  outlet: OutletService
) {
  const isReady = () => {
    const factory = componentFactoryResolver.resolveComponentFactory(
      AsmLoaderComponent
    );
    outlet.add('cx-storefront', factory, OutletPosition.BEFORE);
  };
  return isReady;
}
