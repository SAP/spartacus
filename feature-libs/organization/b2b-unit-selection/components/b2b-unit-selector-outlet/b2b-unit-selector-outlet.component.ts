/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { OutletRefDirective } from '@spartacus/storefront';
import { B2bUnitSelectorComponent } from '../b2b-unit-selector/b2b-unit-selector.component';

/**
 * 通过 Spartacus Outlet 系统将 Company 选择器注入到 SiteContext slot 内，
 * 紧排在 Language / Currency / Theme 之后。
 *
 * 需要在 AppComponent 中挂载此组件，使 outlet 模板始终向 OutletService 注册。
 */
@Component({
  selector: 'cx-b2b-unit-selector-outlet',
  template: `
    <ng-template cxOutletRef="SiteContext" cxOutletPos="after">
      <cx-b2b-unit-selector></cx-b2b-unit-selector>
    </ng-template>
  `,
  imports: [OutletRefDirective, B2bUnitSelectorComponent],
})
export class B2bUnitSelectorOutletComponent {}
