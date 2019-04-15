import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CloseAccountModalComponent } from '../close-account-modal/close-account-modal.component';
import { AuthService } from '@spartacus/core';

@Component({
  selector: 'cx-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseAccountComponent {
  modal: any;
  constructor(
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  openModal(): void {
    this.modal = this.modalService.open(CloseAccountModalComponent, {
      centered: true,
    }).componentInstance;
    this.modal.userToken$ = this.authService.getUserToken();
  }
}
