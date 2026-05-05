/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TemplateRef } from "@angular/core";
import { HierarchyNode } from "../hierarchy-node";
import { CollapsibleNode } from "../hierarchy-node-collapsible";
import { TitleNode } from "../hierarchy-node-title";

export interface HierarchyOptions<T = any> {
    tree: CollapsibleNode<T> | TitleNode | HierarchyNode<T>; // Root node of the tree model.
    disabled?: boolean; // Indicates if the hierarchy is disabled
    template?: TemplateRef<any>; // Template reference
    onItemRemove?: (itemNumber: any) => void; // Function to handle item removal
    onItemEdit?: (itemNumber: any) => void; // Function to handle item edit
    titleReadonly?: boolean; // Indicates if the title is readonly
    collasibleReadonly?: boolean; // Indicates if collapsibility is readonly
    maxHeight?: string; // Defines the maximum height of visible part of the tree.
}
