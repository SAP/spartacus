/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, Input, OnDestroy, OnInit, TemplateRef, inject } from '@angular/core';
import { OutletPosition } from '../outlet.model';
import { OutletService } from '../outlet.service';

@Directive({
  selector: '[cxOutletRef]',
  standalone: false,
})
export class OutletRefDirective implements OnInit, OnDestroy {
  private tpl = inject<TemplateRef<any>>(TemplateRef);
  private outletService = inject(OutletService);

  @Input()
  cxOutletRef: string;
  @Input()
  cxOutletPos: OutletPosition;

  ngOnInit() {
    this.outletService.add(this.cxOutletRef, this.tpl, this.cxOutletPos);
  }

  ngOnDestroy() {
    this.outletService.remove(this.cxOutletRef, this.cxOutletPos, this.tpl);
  }
}
