import { Component } from '@angular/core';
import { AnonymousConsentDialogComponent } from '../../../shared/components/anonymous-consents/dialog/anonymous-consent-dialog.component';
import { ModalComponentService } from '../../../shared/components/modal/new/modal-component.service';
import { ModalService } from '../../../shared/index';

@Component({
  selector: 'cx-anonymous-consent-open-dialog',
  templateUrl: './anonymous-consent-open-dialog.component.html',
})
export class AnonymousConsentOpenDialogComponent {
  constructor(
    protected modalService: ModalService,
    protected modalComponentService: ModalComponentService
  ) {}

  openDialog(): void {
    this.modalComponentService.open(AnonymousConsentDialogComponent);
  }
}
