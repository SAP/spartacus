import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

/**
 * Options available for modal instance
 *
 * @todo remove ngb dependency and create our own set of props for this interface
 */
export interface ModalOptions extends NgbModalOptions {
  // below prop is temporarily here for extending purposes
  // note: you can't extend interface without new props
  // @todo: delete below prop after removing NgbModalOptions dependency
  temp?: any;
}
