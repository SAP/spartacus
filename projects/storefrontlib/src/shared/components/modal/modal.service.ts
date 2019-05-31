import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalRef } from './modal-ref';
import { ModalOptions } from './modal-options';

/**
 * A service to handle modal
 */
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: ModalRef[] = [];
  constructor(private ngbModalService: NgbModal) {}

  open(content: any, options?: ModalOptions): ModalRef {
    let activeModal: ModalRef;

    activeModal = this.ngbModalService.open(content, options);
    this.modals.push(activeModal);

    return activeModal;
  }

  getActiveModal(): ModalRef {
    const modal = this.modals[this.modals.length - 1];
    return modal ? modal : null;
  }

  dismissActiveModal(reason?: any): void {
    const modal: ModalRef = this.getActiveModal();

    if (modal) {
      modal.dismiss(reason);
      this.modals.pop();
    }
  }

  closeActiveModal(reason?: any): void {
    const modal: ModalRef = this.getActiveModal();

    if (modal) {
      modal.close(reason);
      this.modals.pop();
    }
  }
}
