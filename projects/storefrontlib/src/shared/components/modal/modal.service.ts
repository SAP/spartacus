import { ApplicationRef, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatureConfigService } from '@spartacus/core';
import { ModalOptions } from './modal-options';
import { ModalRef } from './modal-ref';

/**
 * A service to handle modal
 */
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: ModalRef[] = [];

  constructor(
    ngbModalService: NgbModal,
    applicationRef?: ApplicationRef,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    featureConfigService?: FeatureConfigService
  );
  /**
   * @deprecated since 3.3
   */
  constructor(ngbModalService: NgbModal);
  constructor(
    private ngbModalService: NgbModal,
    // TODO: make this param required in 4.0
    protected applicationRef?: ApplicationRef,
    // TODO: drop this param in 4.0
    protected featureConfigService?: FeatureConfigService
  ) {}

  protected get rootComponent() {
    return this.applicationRef?.components?.[0]?.location?.nativeElement;
  }

  open(content: any, options?: ModalOptions): ModalRef {
    let activeModal: ModalRef;

    // TODO: make this logic default in 4.0
    if (this.featureConfigService?.isLevel('3.3')) {
      options = { container: this.rootComponent, ...options };
    }

    activeModal = this.ngbModalService.open(content, options);
    this.modals.push(activeModal);
    this.handleModalRemoveEvents(activeModal);

    return activeModal;
  }

  protected handleModalRemoveEvents(modal: ModalRef): void {
    modal.result.finally(() => {
      this.modals = this.modals.filter((m) => m !== modal);
    });
  }

  getActiveModal(): ModalRef {
    const modal = this.modals[this.modals.length - 1];
    return modal ? modal : null;
  }

  dismissActiveModal(reason?: any): void {
    const modal: ModalRef = this.getActiveModal();

    if (modal) {
      modal.dismiss(reason);
    }
  }

  closeActiveModal(reason?: any): void {
    const modal: ModalRef = this.getActiveModal();

    if (modal) {
      modal.close(reason);
    }
  }
}
