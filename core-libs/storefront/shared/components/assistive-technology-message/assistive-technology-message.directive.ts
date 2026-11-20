/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Directive,
  ElementRef,
  HostListener,
  TemplateRef,
  inject,
  input,
} from '@angular/core';
import {
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { take } from 'rxjs/operators';

@Directive({ selector: '[cxAtMessage]' })
export class AtMessageDirective {
  protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected templateRef = inject<TemplateRef<HTMLElement>>(TemplateRef, {
    optional: true,
  });
  protected globalMessageService = inject(GlobalMessageService);

  /**
   * Usage [cxAtMessage]="'translatableKey' | cxTranslate"
   */
  readonly cxAtMessage = input<string | string[]>();

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
    const cxAtMessage = this.cxAtMessage();
    if (this.host.contains(event?.target as Node) && cxAtMessage) {
      event?.preventDefault();

      const message = Array.isArray(cxAtMessage)
        ? cxAtMessage.join('\n')
        : cxAtMessage;

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
