/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, ElementRef, HostListener, Input, TemplateRef, inject } from '@angular/core';
import {
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[cxAtMessage]',
  standalone: false,
})
export class AtMessageDirective {
  protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected templateRef = inject<TemplateRef<HTMLElement>>(TemplateRef, { optional: true });
  protected globalMessageService = inject(GlobalMessageService);

  /**
   * Usage [cxAtMessage]="'translatableKey' | cxTranslate"
   */
  @Input() cxAtMessage: string | string[] | undefined;

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
    event?.preventDefault();

    if (event?.target === this.host && this.cxAtMessage) {
      const message = Array.isArray(this.cxAtMessage)
        ? this.cxAtMessage.join('\n')
        : this.cxAtMessage;

      this.globalMessageService
        .get()
        .pipe(take(1))
        .subscribe((globalMessageEntities: GlobalMessageEntities) => {
          // Override current assitive message.
          if (globalMessageEntities[GlobalMessageType.MSG_TYPE_ASSISTIVE]) {
            this.globalMessageService.remove(
              GlobalMessageType.MSG_TYPE_ASSISTIVE
            );
          }
          this.globalMessageService.add(
            message,
            GlobalMessageType.MSG_TYPE_ASSISTIVE
          );
        });
    }
  }
}
