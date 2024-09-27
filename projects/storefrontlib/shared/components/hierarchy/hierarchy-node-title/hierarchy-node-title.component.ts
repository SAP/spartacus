/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { TitleNode } from './title-node.model';
import { ActiveCartFacade } from '@spartacus/cart/base/root';

/**
 * Hierarchy Selection node variant to show a title
 */
@Component({
  selector: 'cx-hierarchy-node-title',
  templateUrl: './hierarchy-node-title.component.html',
})
export class HierarchyNodeTitleComponent {
  @Input() tree: TitleNode;

  @Input() activeCartService: ActiveCartFacade;

  @Input() readonly = false;

  removeBundle(entryGroupNumber: any) {
    this.activeCartService.removeEntryGroup(entryGroupNumber);
    console.log('removeBundle in ' + entryGroupNumber);
  }

}
