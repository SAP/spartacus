import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalService } from '../../../../../shared/components/modal/index';
import { CloseAccountModalComponent } from '../close-account-modal/close-account-modal.component';

/**
 * @deprecated since 3.2, moved to @spartacus/user package.
 */
@Component({
  selector: 'cx-close-account',
  templateUrl: './close-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseAccountComponent {
  modal: any;
  constructor(private modalService: ModalService) {}

  openModal(): void {
    this.modal = this.modalService.open(CloseAccountModalComponent, {
      centered: true,
    }).componentInstance;
  }
}
