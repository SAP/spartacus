import { Component } from '@angular/core';
import { AnonymousConsentDialogComponent } from '../../../shared/components/anonymous-consents/dialog/anonymous-consent-dialog.component';
import { ModalService } from '../../../shared/index';

@Component({
  selector: 'cx-anonymous-consent-footer-link',
  templateUrl: './anonymous-consent-footer-link-component.html',
})
export class AnonymousConsentFooterLinkComponent {
  constructor(protected modalService: ModalService) {}

  openDialog(): void {
    this.modalService.open(AnonymousConsentDialogComponent, {
      centered: true,
      size: 'lg',
    });
  }
}
