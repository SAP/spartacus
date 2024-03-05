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
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { HierarchyNode } from '../hierarchy-node/hierarchy-node.model';
import { ActiveCartFacade } from '@spartacus/cart/base/root';

/**
 * Selector component that displays a tree-based model.
 */
@Component({
  selector: 'cx-hierarchy',
  templateUrl: './hierarchy.component.html',
})
export class HierarchyComponent implements OnInit {
  /**
   * Defines the maximum height of visible part of the tree.
   */
  @Input() maxHeight: string;
  /**
   * Root node of the tree model.  The children of this node are used to populate the selector view
   */
  @Input() tree: HierarchyNode;

  @Input() disabled: boolean;

  @Input() template: TemplateRef<any>;

  @Input() activeCartService: ActiveCartFacade;

  @Input() titleReadonly = false;

  @Input() collasibleReadonly = false;
  /**
   * Defines the styling object applied to the hierarchy tree.
   * Note:
   * - used to provide maxHeight property from consumer.
   */
  hierarchyStyle: {
    maxHeight: string;
    overflow: string;
  };

  ngOnInit(): void {
    if (this.maxHeight !== undefined) {
      this.hierarchyStyle = {
        maxHeight: this.maxHeight,
        overflow: 'auto',
      };
    }
  }
}
