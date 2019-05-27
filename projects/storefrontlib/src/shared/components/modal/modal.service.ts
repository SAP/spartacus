import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalRef } from './modal-ref';
import { ModalOptions } from './modal-options';

/**
 * A service to open modal
 *
 * @export
 * @class ModalService
 */
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private ngbModalService: NgbModal) {}

  open(content: any, options?: ModalOptions): ModalRef {
    return this.ngbModalService.open(content, options ? options : null);
  }
}
