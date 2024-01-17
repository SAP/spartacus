/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';

import { AbstractOrderKey } from '@spartacus/cart/base/root';
import { AbstractOrderContextSource } from './abstract-order-context-source.model';
import { AbstractOrderContext } from './abstract-order-context.model';

@Directive({
  selector: '[cxAbstractOrderContext]',
  providers: [
    AbstractOrderContextSource,
    { provide: AbstractOrderContext, useExisting: AbstractOrderContextSource },
  ],
})
export class AbstractOrderContextDirective implements OnChanges {
  @Input() cxAbstractOrderContext: AbstractOrderKey;

  protected abstractOrderContextSource = inject(AbstractOrderContextSource);

  ngOnChanges(changes: SimpleChanges): void {
    const contextChanges = changes.cxAbstractOrderContext;
    if (contextChanges) {
      const previousValue = contextChanges.previousValue;
      const currentValue = contextChanges.currentValue;
      if (!previousValue || previousValue.id !== currentValue.id) {
        this.abstractOrderContextSource.id$.next(
          this.cxAbstractOrderContext.id
        );
      }
      if (!previousValue || previousValue.type !== currentValue.type) {
        this.abstractOrderContextSource.type$.next(
          this.cxAbstractOrderContext.type
        );
      }
    }
  }
}
