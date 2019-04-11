import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cx-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseAccountComponent {
  modalInstance: any;

  constructor(private modalService: NgbModal) {}

  openModal(): void {
    this.modalInstance = this.modalService.open({});
  }
}
