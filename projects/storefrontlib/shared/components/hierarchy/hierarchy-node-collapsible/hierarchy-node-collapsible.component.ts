/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, HostBinding, Input } from '@angular/core';
import { CollapsibleNode } from './collapsible-node.model';
import { HierarchyOptions } from '../hierarchy/hierarchy.model';

/**
 * Hierarchy Selection node variant that is collapsible
 */
@Component({
  selector: 'cx-hierarchy-node-collapsible',
  templateUrl: './hierarchy-node-collapsible.component.html',
})
export class HierarchyNodeCollapsibleComponent<T> {
  @Input() options!: HierarchyOptions<T>;

  @HostBinding('class.open') get open(): boolean {
    return (this.options.tree as CollapsibleNode<T>).open;
  }

  toggle(): void {
    if (this.options.tree instanceof CollapsibleNode && !this.options.tree.disabled) {
      this.options.tree.open = !this.options.tree.open;
    }
  }

  get collapsibleChildren(): CollapsibleNode<T>[] {
    return this.options.tree.children as CollapsibleNode<T>[];
  }

  onItemEdit(itemNumber: any): void {
     // TODO: Implement edit Bundle in future Integration
    if (this.options.onItemEdit) {
      this.options.onItemEdit(itemNumber);
    }
  }
}
