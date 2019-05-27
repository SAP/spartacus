import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

/**
 * Options available for modal instance
 *
 * @todo remove ngb dependency and create our own set of props for this interface
 */
export interface ModalOptions extends NgbModalOptions {
  temp?: any;
}
