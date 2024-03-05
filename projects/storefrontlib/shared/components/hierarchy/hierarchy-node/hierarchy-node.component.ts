/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * 2024 SAP SE or an SAP affiliate company. All rights reserved.
 */

import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { HierarchyNode } from './hierarchy-node.model';
import { TitleNode } from '../hierarchy-node-title/title-node.model';
import { CollapsibleNode } from '../hierarchy-node-collapsible/collapsible-node.model';
import { ActiveCartFacade } from '@spartacus/cart/base/root';

@Component({
  selector: 'cx-hierarchy-node',
  templateUrl: './hierarchy-node.component.html',
})
export class HierarchyNodeComponent<T> implements OnInit, OnChanges {
  @Input() tree: HierarchyNode<T>;

  @Input() template: TemplateRef<any>;

  @Input() activeCartService: ActiveCartFacade;

  @Input() titleReadonly = false;

  @Input() collasibleReadonly = false;

  /** Node variant type.  Used to select the correct variant node */
  type: string;

  collasibleTree: CollapsibleNode<T>;

  @HostBinding('class.disabled') get disabled(): boolean {
    return this.tree.disabled;
  }

  ngOnInit(): void {
    this.setType();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tree) {
      this.setType();
    }
  }

  private setType(): void {
    if (this.tree instanceof TitleNode) {
      this.type = 'TITLE';
    } else if (this.tree instanceof CollapsibleNode) {
      this.type = 'COLLAPSIBLE';
      this.collasibleTree = this.tree;
    }
  }
}
