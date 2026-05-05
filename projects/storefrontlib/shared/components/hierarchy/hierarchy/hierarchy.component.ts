/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, OnInit } from '@angular/core';
import { HierarchyOptions } from './hierarchy.model';

/**
 * Selector component that displays a tree-based model.
 */
@Component({
  selector: 'cx-hierarchy',
  templateUrl: './hierarchy.component.html',
})
export class HierarchyComponent implements OnInit {
  /**
   * Default options for the hierarchy component.
   */
  private defaultOptions: Partial<HierarchyOptions> = {
    titleReadonly: false,
    collasibleReadonly: false,
  };

  @Input() options!: HierarchyOptions;

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
    // Merge provided options with defaults
    this.options = { ...this.defaultOptions, ...this.options };
    if (this.options.maxHeight !== undefined) {
      this.hierarchyStyle = {
        maxHeight: this.options.maxHeight,
        overflow: 'auto',
      };
    }
  }
}
