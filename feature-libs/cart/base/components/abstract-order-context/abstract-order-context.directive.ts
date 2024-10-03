/*
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

import { AbstractOrderKey, AbstractOrderType } from '@spartacus/cart/base/root';
import { AbstractOrderContextSource } from './abstract-order-context-source.model';
import { AbstractOrderContext } from './abstract-order-context.model';

/**
 * Consumers cannot always guarentee at design time that id is present
 * -> we provide this 'relaxed' version of {@link AbstractOrderKey} and
 * check at runtime if id is present for the document types that require it.
 */
export interface AbstractOrderKeyInput {
  type: AbstractOrderType;
  id?: string;
}

@Directive({
  selector: '[cxAbstractOrderContext]',
  providers: [
    AbstractOrderContextSource,
    { provide: AbstractOrderContext, useExisting: AbstractOrderContextSource },
  ],
})
export class AbstractOrderContextDirective implements OnChanges {
  @Input() cxAbstractOrderContext: AbstractOrderKeyInput;

  protected abstractOrderContextSource = inject(AbstractOrderContextSource);

  ngOnChanges(changes: SimpleChanges): void {
    const contextChanges = changes.cxAbstractOrderContext;
    if (contextChanges) {
      let abstractOrderKey: AbstractOrderKey;
      const type = contextChanges.currentValue.type;
      if (type === AbstractOrderType.CART) {
        abstractOrderKey = { type };
      } else {
        const id = contextChanges.currentValue.id;
        if (id) {
          abstractOrderKey = { type, id };
        } else {
          throw new Error('id required for order, quote or saved cart');
        }
      }
      this.abstractOrderContextSource.key$.next(abstractOrderKey);
    }
  }
}
