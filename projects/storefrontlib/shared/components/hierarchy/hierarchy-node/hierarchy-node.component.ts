/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TitleNode } from '../hierarchy-node-title/title-node.model';
import { CollapsibleNode } from '../hierarchy-node-collapsible/collapsible-node.model';
import { HierarchyOptions } from '../hierarchy/hierarchy.model';

@Component({
  selector: 'cx-hierarchy-node',
  templateUrl: './hierarchy-node.component.html',
})
export class HierarchyNodeComponent<T> implements OnInit, OnChanges {
  @Input() options!: HierarchyOptions<T>;

  /** Node variant type.  Used to select the correct variant node */
  type: string;

  collasibleTree: CollapsibleNode<T>;

  @HostBinding('class.disabled') get disabled(): boolean {
    return this.options.tree.disabled;
  }

  ngOnInit(): void {
    this.setType();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this.setType();
    }
  }

  private setType(): void {
    if (this.options.tree instanceof TitleNode) {
      this.type = 'TITLE';
    } else if (this.options.tree instanceof CollapsibleNode) {
      this.type = 'COLLAPSIBLE';
      this.collasibleTree = this.options.tree;
    }
  }
}
