import { Component } from '@angular/core';
import { AnonymousConsentDialogComponent } from '../../../shared/components/anonymous-consents/dialog/anonymous-consent-dialog.component';
import { ModalService } from '../../../shared/components/modal/modal.service';

@Component({
  selector: 'cx-anonymous-consent-open-dialog',
  templateUrl: './anonymous-consent-open-dialog.component.html',
})
export class AnonymousConsentOpenDialogComponent {
  constructor(protected modalService: ModalService) {}

  openDialog(): void {
    this.modalService.open(AnonymousConsentDialogComponent, {
      centered: true,
      size: 'lg',
    });
  }
}
