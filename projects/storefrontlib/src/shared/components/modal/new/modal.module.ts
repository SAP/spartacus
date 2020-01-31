import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { Config, provideConfig } from '@spartacus/core';
import { OutletModule } from '../../../../cms-structure/outlet/index';
import { DEFAULT_MODAL_CONFIG } from '../config/default-modal-config';
import { ModalConfig } from '../config/modal-config';
import { ModalEnablerService } from '../service/modal-enabler.service';
import { ModalComponent } from './modal.component';

@NgModule({
  imports: [CommonModule, OutletModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: modalFactory,
      deps: [ModalEnablerService],
      multi: true,
    },
    provideConfig(DEFAULT_MODAL_CONFIG),
    { provide: ModalConfig, useExisting: Config },
  ],
  declarations: [ModalComponent],
  entryComponents: [ModalComponent],
  exports: [ModalComponent],
})
export class ModalModule {}

/**
 *
 * We do not like to block the UI, which is why we delegate loading of ASM
 * to a real component; the router and state aren't available in an optimized
 * way during the APP_INITIALIZER.
 */
export function modalFactory(modalEnablerService: ModalEnablerService) {
  const isReady = () => {
    modalEnablerService.load();
  };
  return isReady;
}
