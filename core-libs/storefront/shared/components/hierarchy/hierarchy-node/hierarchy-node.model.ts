/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TemplateRef, Type } from '@angular/core';

/**
 * Basic node in a Hierarchy Select tree
 */
export class HierarchyNode<T = any, F = any> {
  children: Array<HierarchyNode> = [];
  disabled = false;
  hidden = false;
  value?: Value;
  parent?: HierarchyNode;
  contentTemplate?: Type<F> | TemplateRef<HierarchyNode<T>>;

  constructor(
    public name = '',
    {
      children = [],
      disabled = false,
      hidden = false,
      value,
      parent,
      contentTemplate,
    }: Partial<HierarchyNode<T>> = defaultHierarchyNodeArgs
  ) {
    this.children = children;
    this.disabled = disabled;
    this.hidden = hidden;
    this.value = value;
    this.parent = parent;
    this.contentTemplate = contentTemplate;

    this.children.forEach((child) => {
      child.parent = this;
    });
  }
}

export const defaultHierarchyNodeArgs: Partial<HierarchyNode> = {
  children: [],
  disabled: false,
  hidden: false,
};

// Reserve objects for users to save data
export interface Value {
  // entryGroupNumber?: number;
  // entries?: any[];
  key?: number;
  data?: any[];
}
