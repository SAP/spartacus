import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnonymousConsent, ConsentTemplate } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/index';
import { ModalService } from '../../modal';

@Component({
  selector: 'cx-anonymous-consents-dialog',
  templateUrl: './anonymous-consents-dialog.component.html',
})
export class AnonymousConsentsDialogComponent {
  iconTypes = ICON_TYPE;

  templates$: Observable<ConsentTemplate[]>;
  consents$: Observable<AnonymousConsent[]>;

  @ViewChild('dialog', { static: false, read: ElementRef })
  dialog: ElementRef;

  constructor(private modalService: ModalService) {}

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }
}
