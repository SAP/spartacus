import { Component } from '@angular/core';
import { ANONYMOUS_CONSENTS_FEATURE } from '@spartacus/core';
import { AnonymousConsentDialogComponent } from '../../../shared/components/anonymous-consents/dialog/anonymous-consent-dialog.component';
import { ModalService } from '../../../shared/index';

@Component({
  selector: 'cx-anonymous-consent-open-dialog',
  templateUrl: './anonymous-consent-open-dialog.component.html',
})
export class AnonymousConsentOpenDialogComponent {
  anonymousConsentsFeature = ANONYMOUS_CONSENTS_FEATURE;

  constructor(protected modalService: ModalService) {}

  openDialog(): void {
    this.modalService.open(AnonymousConsentDialogComponent, {
      centered: true,
      size: 'lg',
    });
  }
}
