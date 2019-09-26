import { Component } from '@angular/core';
import { AnonymousConsentsService } from '@spartacus/core';
import { ModalRef, ModalService } from '../../modal/index';
import { AnonymousConsentsDialogComponent } from './anonymous-consents-dialog.component';

@Component({
  selector: 'cx-anonymous-consents',
  templateUrl: './anonymous-consents.component.html',
})
export class AnonymousConsentsComponent {
  modalRef: ModalRef;

  constructor(
    private modalService: ModalService,
    private anonymousConsentsService: AnonymousConsentsService
  ) {}

  openDialog(): void {
    this.modalRef = this.modalService.open(AnonymousConsentsDialogComponent, {
      centered: true,
      size: 'lg',
    });

    const modalInstance: AnonymousConsentsDialogComponent = this.modalRef
      .componentInstance;
    modalInstance.consents$ = this.anonymousConsentsService.getAnonymousConsents();
    modalInstance.templates$ = this.anonymousConsentsService.getAnonymousConsentTemplates();
  }
}
