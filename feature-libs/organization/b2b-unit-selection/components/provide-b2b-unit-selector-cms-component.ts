/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { B2bUnitSelectorComponent } from './b2b-unit-selector/b2b-unit-selector.component';

/**
 * Registers `B2bUnitSelectorComponent` in the CMS component map.
 *
 * Call this helper alongside `provideConfig({ b2bUnitSelection: { enabled: true } })`
 * in your feature module.  Keeping the CMS registration separate from the base
 * `B2bUnitSelectionComponentsModule` ensures the component is never instantiated
 * by Angular's CMS engine when the feature is disabled — which would otherwise
 * create Zone.js micro-tasks and prevent `ApplicationRef.isStable` from emitting
 * `true`, causing Cypress `cy.wait()` calls to time out.
 */
export function provideB2bUnitSelectorCmsComponent(): Provider {
  return provideDefaultConfig(<CmsConfig>{
    cmsComponents: {
      B2bUnitSelectorComponent: {
        component: B2bUnitSelectorComponent,
      },
    },
  });
}
