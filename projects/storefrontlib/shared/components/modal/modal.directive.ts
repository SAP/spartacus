import {
  Directive,
  HostListener,
  Injectable,
  Input,
  Optional,
} from '@angular/core';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export interface ModalDirectiveOptions {
  /**
   * Action to perform after click
   */
  type: 'dismiss' | 'close';

  /**
   * Reason for dismissing or closing the modal
   */
  reason?: string;
}

/**
 * Service to control the behavior of the DismissModalDirective
 */
@Injectable({
  providedIn: 'root',
})
export class ModalDirectiveService {
  /**
   * Handler for the click event on the directive
   *
   * @param options.type    Action to perform after click - close or dismiss
   * @param options.reason  Reason for dismissing or closing the modal
   * @param url             url (optional) - exists only when the directive is also a `routerLink`.
   */
  onClick(
    options: ModalDirectiveOptions,
    activeModal: NgbActiveModal,
    url?: string
  ): void {
    let reason = options.reason;

    if (!reason && url) {
      reason = `Link click: ${url}`;
    }

    if (options.type === 'dismiss') {
      activeModal.dismiss(reason);
    } else if (options.type === 'close') {
      activeModal.close(reason);
    }
  }
}

/**
 * Directive to dismiss the modal on click
 */
@Directive({
  selector: '[cxModal]',
})
export class ModalDirective {
  /**
   * Action to perform, when the directive is clicked - dismiss or close.
   *
   * Reason can be given via input `cxModalReason`, which fallbacks to URL of the `routerLink` (if exists on the same element).
   */
  @Input() cxModal: ModalDirectiveOptions['type'];

  /**
   * Reason for closing/dismissing the modal. Fallbacks to URL of the `routerLink` (if exists on the same element).
   */
  @Input() cxModalReason: ModalDirectiveOptions['reason'];

  constructor(
    protected service: ModalDirectiveService,
    protected router: Router,

    // active modal can be injected only when the directive is projected inside modal
    @Optional() protected activeModal: NgbActiveModal,

    @Optional() protected routerLink: RouterLink,
    @Optional() protected routerLinkWithHref: RouterLinkWithHref
  ) {}

  /**
   * Returns URL in case when the directive is in the scope of a `routerLink` directive at the same time.
   */
  protected getUrl(): string | undefined {
    const routerLink = this.routerLink ?? this.routerLinkWithHref;
    return routerLink
      ? this.router.serializeUrl(routerLink.urlTree)
      : undefined;
  }

  @HostListener('click')
  onClick() {
    if (this.activeModal) {
      this.service.onClick(this.options, this.activeModal, this.getUrl());
    }
  }

  /**
   * Converts the directive's inputs to the shape of modal directive options
   */
  protected get options(): ModalDirectiveOptions {
    return { type: this.cxModal, reason: this.cxModalReason };
  }
}
