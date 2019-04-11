import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CloseAccountModalComponent } from '../close-account-modal/close-account-modal.component';

@Component({
  selector: 'cx-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseAccountComponent {
  constructor(private modalService: NgbModal) {}

  openModal(): void {
    this.modalService.open(CloseAccountModalComponent, {
      centered: true,
    });
  }
}
