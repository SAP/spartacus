/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TemplateRef } from "@angular/core";
import { HierarchyNode } from "../hierarchy-node";
import { CollapsibleNode } from "../hierarchy-node-collapsible";
import { TitleNode } from "../hierarchy-node-title";

/**
 * Structural shape of a hierarchy entry group consumed by the hierarchy component.
 * Kept minimal and framework-agnostic so this component does not depend on
 * `@spartacus/cart`. Structurally compatible with `OrderEntryGroup`.
 */
export interface HierarchyEntryGroup {
    entryGroupNumber?: number;
    label?: string;
    type?: string;
    entries?: unknown[];
    entryGroups?: HierarchyEntryGroup[];
}

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
