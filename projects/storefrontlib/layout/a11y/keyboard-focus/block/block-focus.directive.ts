/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, ElementRef, OnInit, inject } from '@angular/core';
import { BaseFocusService } from '../base/base-focus.service';
import { BlockFocusConfig } from '../keyboard-focus.model';
import { VisibleFocusDirective } from '../visible/visible-focus.directive';

@Directive()
// { selector: '[cxBlockFocus]' }
export class BlockFocusDirective
  extends VisibleFocusDirective
  implements OnInit
{
  protected elementRef: ElementRef;
  protected service: BaseFocusService;

  protected defaultConfig: BlockFocusConfig = { block: true };

  // @Input('cxBlockFocus')
  protected config: BlockFocusConfig = {};

  constructor() {
    const elementRef = inject(ElementRef);
    const service = inject(BaseFocusService);

    super(elementRef, service);
  
    this.elementRef = elementRef;
    this.service = service;
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.config.block) {
      this.tabindex = -1;
    }
  }
}
