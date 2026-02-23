/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Optional,
  TemplateRef,
} from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';

@Directive({ selector: '[cxAtMessage]' })
export class AtMessageDirective {
  /**
   * Usage [cxAtMessage]="'translatableKey' | cxTranslate"
   */
  @Input() cxAtMessage: string | string[] | undefined;

  constructor(
    protected elementRef: ElementRef<HTMLElement>,
    @Optional() protected templateRef: TemplateRef<HTMLElement>,
    protected globalMessageService: GlobalMessageService
  ) {}

  protected get host(): HTMLElement {
    return !!this.templateRef
      ? this.templateRef.elementRef.nativeElement.parentElement
      : this.elementRef.nativeElement;
  }

  /**
   * Emit assistive global meesage to improve screen reader vocalization.
   * @param event
   */
  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent): void {
    if (this.host.contains(event?.target as Node) && this.cxAtMessage) {
      const message = Array.isArray(this.cxAtMessage)
        ? this.cxAtMessage.join('\n')
        : this.cxAtMessage;

      // Clear any existing assistive messages first, then add the new one.
      // This is done synchronously to ensure the message is added before
      // any component destruction that may happen as a result of the click.
      this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ASSISTIVE);
      this.globalMessageService.add(
        message,
        GlobalMessageType.MSG_TYPE_ASSISTIVE
      );
    }
  }
}
