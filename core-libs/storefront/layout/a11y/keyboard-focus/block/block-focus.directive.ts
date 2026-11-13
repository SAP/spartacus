/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, OnInit } from '@angular/core';
import { BlockFocusConfig } from '../keyboard-focus.model';
import { VisibleFocusDirective } from '../visible/visible-focus.directive';

@Directive()
// { selector: '[cxBlockFocus]' }
export class BlockFocusDirective
  extends VisibleFocusDirective
  implements OnInit
{
  protected defaultConfig: BlockFocusConfig = { block: true };

  // @Input('cxBlockFocus')
  protected config: BlockFocusConfig = {};

  ngOnInit() {
    super.ngOnInit();
    if (this.config.block) {
      this.tabindex = -1;
    }
  }
}
