import {
  Directive,
  Injectable,
  Input,
  Optional,
} from '@angular/core';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';

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
    url?: string
  ): void {
    let reason = options.reason;

    if (!reason && url) {
      reason = `Link click: ${url}`;
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

    @Optional() protected routerLink: RouterLink,
    @Optional() protected routerLinkWithHref: RouterLinkWithHref
  ) {}

  /**
   * Returns URL in case when the directive is in the scope of a `routerLink` directive at the same time.
   */
  protected getUrl(): string | undefined {
    const routerLink = this.routerLink ?? this.routerLinkWithHref;
    return routerLink && routerLink.urlTree
      ? this.router.serializeUrl(routerLink.urlTree)
      : undefined;
  }

  /**
   * Converts the directive's inputs to the shape of modal directive options
   */
  protected get options(): ModalDirectiveOptions {
    return { type: this.cxModal, reason: this.cxModalReason };
  }
}
