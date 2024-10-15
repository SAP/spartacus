/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, HostBinding, Input, TemplateRef } from '@angular/core';
import { CollapsibleNode } from './collapsible-node.model';

/**
 * Hierarchy Selection node variant that is collapsible
 */
@Component({
  selector: 'cx-hierarchy-node-collapsible',
  templateUrl: './hierarchy-node-collapsible.component.html',
})
export class HierarchyNodeCollapsibleComponent<T> {
  @Input() template: TemplateRef<any>;

  @Input() tree: CollapsibleNode<T>;

  @HostBinding('class.open') get open(): boolean {
    return this.tree.open;
  }

  @Input() readonly = false;

  toggle(): void {
    if (!this.tree.disabled) {
      this.tree.open = !this.tree.open;
    }
  }

  get collapsibleChildren(): CollapsibleNode<T>[] {
    return this.tree.children as CollapsibleNode<T>[];
  }

  editBundle(entryGroupNumber: any) {
    // TODO: Implement editBundle
    return entryGroupNumber;
  }
}
