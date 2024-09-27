/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HierarchyNodeCollapsibleComponent } from './hierarchy-node-collapsible/hierarchy-node-collapsible.component';
import { HierarchyNodeComponent } from './hierarchy-node/hierarchy-node.component';
import { HierarchyNodeTitleComponent } from './hierarchy-node-title/hierarchy-node-title.component';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { I18nModule } from '@spartacus/core';
import { IconModule } from "../../../cms-components/misc/icon/icon.module";

@NgModule({
    exports: [
        HierarchyComponent,
        HierarchyNodeComponent,
        HierarchyNodeTitleComponent,
        HierarchyNodeCollapsibleComponent,
    ],
    declarations: [
        HierarchyNodeCollapsibleComponent,
        HierarchyNodeTitleComponent,
        HierarchyNodeComponent,
        HierarchyComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        I18nModule,
        IconModule,
      ]
})
export class HierarchyModule {}
