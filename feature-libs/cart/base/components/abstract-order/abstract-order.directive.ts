/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
  selector: '[cxAbstractOrder]',
  providers: [
    AbstractOrderContextSource,
    { provide: AbstractOrderContext, useExisting: AbstractOrderContextSource },
  ],
})
export class AbstractOrderDirective implements OnChanges {
  @Input() cxAbstractOrder: AbstractOrderKey;

  protected abstractOrderContextSource = inject(AbstractOrderContextSource);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cxAbstractOrder) {
      if (
        this.cxAbstractOrder.id !== this.abstractOrderContextSource.id$.value
      ) {
        this.abstractOrderContextSource.id$.next(this.cxAbstractOrder.id);
      }
      if (
        this.cxAbstractOrder.type !==
        this.abstractOrderContextSource.type$.value
      ) {
        this.abstractOrderContextSource.type$.next(this.cxAbstractOrder.type);
      }
    }
  }
}
