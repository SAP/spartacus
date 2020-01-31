import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { tap } from 'rxjs/operators';
import { ModalBehaviorConfig, ModalConfig } from '../config/modal-config';
import {
  ModalComponentService,
  MODAL_OPEN_CLASS,
} from './modal-component.service';

@Component({
  selector: 'cx-modal',
  templateUrl: 'modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  config: ModalBehaviorConfig;

  @HostBinding('class.hidden') disabled = true;

  $opened = this.modalComponentService.opened.pipe(
    tap(opened => (this.disabled = !opened))
  );

  $selector = this.modalComponentService.component.pipe(
    tap(selector => {
      if (this.modalConfig.modal) {
        this.config = this.modalConfig.modal[selector];
        this.applyConfigs();
      }
    })
  );

  constructor(
    protected modalComponentService: ModalComponentService,
    protected modalConfig: ModalConfig,
    protected windowRef: WindowRef
  ) {}

  close(): void {
    if (this.config && this.config.overlayClickClose) {
      this.modalComponentService.close();
    }
  }

  private applyConfigs(): void {
    if (this.config.pageScrollLock) {
      this.windowRef.document.body.classList.add(MODAL_OPEN_CLASS);
    }
  }
}
