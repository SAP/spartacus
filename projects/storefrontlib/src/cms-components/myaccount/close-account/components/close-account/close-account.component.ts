import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CloseAccountModalComponent } from '../close-account-modal/close-account-modal.component';

@Component({
  selector: 'cx-close-account',
  templateUrl: './close-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseAccountComponent {
  modal: any;
  constructor(private modalService: NgbModal) {}

  openModal(): void {
    this.modal = this.modalService.open(CloseAccountModalComponent, {
      centered: true,
    }).componentInstance;
  }
}
