import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { PageComponentModule } from '@spartacus/storefront';
import { AsmEnablerService } from './services/asm-enabler.service';

/**
 * The ASM loader module takes care of loading the ASM UI
 * only in case there's a reason to do so.
 */
@NgModule({
  imports: [CommonModule, PageComponentModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: asmFactory,
      deps: [AsmEnablerService],
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
export function asmFactory(asmEnablerService: AsmEnablerService): () => void {
  const isReady = () => {
    asmEnablerService.load();
  };
  return isReady;
}
