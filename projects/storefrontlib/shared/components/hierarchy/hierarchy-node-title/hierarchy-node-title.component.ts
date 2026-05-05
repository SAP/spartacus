/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { HierarchyOptions } from '../hierarchy/hierarchy.model';
import { TitleNode } from './title-node.model';

/**
 * Hierarchy Selection node variant to show a title
 */
@Component({
  selector: 'cx-hierarchy-node-title',
  templateUrl: './hierarchy-node-title.component.html',
})
export class HierarchyNodeTitleComponent {
  @Input() options!: HierarchyOptions<TitleNode>;

  onItemRemove(itemNumber: any): void {
    if (this.options.onItemRemove) {
      this.options.onItemRemove(itemNumber);
    }
  }
}
