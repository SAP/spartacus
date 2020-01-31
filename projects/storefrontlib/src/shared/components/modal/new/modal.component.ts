import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { tap, withLatestFrom } from 'rxjs/operators';
import { ModalBehaviorConfig, ModalConfig } from '../config/modal-config';
import { ModalComponentService } from './modal-component.service';

@Component({
  selector: 'cx-modal',
  templateUrl: 'modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  config: ModalBehaviorConfig;

  @HostBinding('class.hidden') disabled = true;

  // $modal = combineLatest([
  //   this.modalComponentService.opened,
  //   this.modalComponentService.component,
  // ]).pipe(
  //   tap(([opened, selector]) => {
  //     this.disabled = !opened;
  //     if (this.modalConfig.modal) {
  //       this.config = this.modalConfig.modal[selector];
  //     }
  //   })
  // );

  $modal = this.modalComponentService.opened.pipe(
    withLatestFrom(this.modalComponentService.component),
    tap(([opened, selector]) => {
      this.disabled = !opened;
      if (this.modalConfig.modal) {
        this.config = this.modalConfig.modal[selector];
      }
    })
  );

  // $selector = this.modalComponentService.component.pipe(
  //   tap(selector => {
  //     if (this.modalConfig.modal) {
  //       this.config = this.modalConfig.modal[selector];
  //     }
  //   })
  // );

  constructor(
    protected modalComponentService: ModalComponentService,
    protected modalConfig: ModalConfig
  ) {}

  close(): void {
    if (this.config && this.config.overlayClickClose) {
      this.modalComponentService.close();
    }
  }
}
