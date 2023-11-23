/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AbstractOrderContext, AbstractOrderKey } from '../../root/models';
import { AbstractOrderContextSource } from '../cart-shared/abstract-order/abstract-order-context-source.model';

@Directive({
  selector: '[cxAbstractOrder]',
  providers: [
    AbstractOrderContextSource,
    { provide: AbstractOrderContext, useExisting: AbstractOrderContextSource },
  ],
})
export class AbstractOrderDirective implements OnDestroy, OnChanges, OnInit {
  @Input() cxAbstractOrder: AbstractOrderKey;

  subscription = new Subscription();
  protected abstractOrderContextSource = inject(AbstractOrderContextSource);

  constructor() {}
  ngOnInit(): void {
    console.log(
      'CHHI input for directive: ' + JSON.stringify(this.cxAbstractOrder)
    );
    this.abstractOrderContextSource.id$.next(this.cxAbstractOrder.id);
    this.abstractOrderContextSource.type$.next(this.cxAbstractOrder.type);

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHHI simple changes ' + changes);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
